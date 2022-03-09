import { useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider'
import "./App.css";
import Web3 from "web3";


function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null
  })

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({
          web3: new Web3(provider),
          provider
        })
      } else {
        console.error("Please install Metamask")
      }
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0]);
    }

    web3Api.web3 && getAccount(); // Only call getAccounts if web3 initalized
  }, [web3Api.web3])

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <strong className="mr-2">Account: </strong> {
              account ?
                <div>{account}</div> :
                <button
                  className="button is-small"
                  onClick={() => {
                    web3Api.provider.request({ method: "eth_requestAccounts" });
                  }}>
                  Connect Metamask
                </button>}
          </div>
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>10</strong> ETH
          </div>
          <button className="button is-primary mr-2">Donate</button>
          <button className="button is-link">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;