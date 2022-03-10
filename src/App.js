import { useCallback, useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider'
import "./App.css";
import Web3 from "web3";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null
  })

  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [shouldReload, reload] = useState(false);

  const canConnectToContract = account && web3Api.contract
  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload])  // just change false to true to false etc

  const setAccountListener = (provider) => {
    // provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
    provider.on("accountsChanged", _ => window.location.reload());
    provider.on("chainChanged", _ => window.location.reload());
  }
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("Faucet", provider);
        setAccountListener(provider);
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true
        })
      } else {
        setWeb3Api(api => ({ ...api, isProviderLoaded: true }));
        console.error("Please install Metamask")
      }
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether")); // see web3.js documentation to review
    }
    web3Api.contract && loadBalance();
  }, [web3Api, shouldReload])  // when ever one of them changes. 

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0]);
    }

    web3Api.web3 && getAccount(); // Only call getAccounts if web3 initalized
  }, [web3Api.web3])

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether")
    });
    // window.location.reload();
    reloadEffect();
  }, [web3Api, account, reloadEffect])

  const withdraw = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account
    });
    reloadEffect();
  }

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          {web3Api.isProviderLoaded ?
            <div className="is-flex is-align-items-center">
              <strong className="mr-2">Account: </strong> {
                account ?
                  <div>{account}</div> :
                  !web3Api.provider ?
                    <>
                      <div className="notification is-warning is-size-6 is-rounded">
                        Wallet is not detected!{` `}
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href="https://docs.metamask.io">
                          Install Metamask
                        </a>
                      </div>
                    </> :
                    <button
                      className="button is-small"
                      onClick={() => {
                        web3Api.provider.request({ method: "eth_requestAccounts" });
                      }}>
                      Connect Metamask
                    </button>}
            </div> :
            <span>Looking for Web3...</span>
          }
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          {!canConnectToContract &&
            <i className="is-block">
              Connect to Ganache
            </i>
          }
          <button
            disabled={!canConnectToContract}
            className="button is-primary mr-2"
            onClick={addFunds}>Donate 1 eth</button>
          <button
            disabled={!canConnectToContract}
            className="button is-link"
            onClick={withdraw}>Withdraw 0.1 eth</button>
        </div>
      </div>
    </>
  );
}

export default App;

