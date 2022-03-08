# Truffle notes

## Start the console
- `truffle console`

## Basics
- `accounts` lists out the accounts (in ganache)


## Web3
### Send transaction
https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction

`web3.eth.sendTransaction({from:accounts[0], to:"0x53F8AD0640C97254459571d275c64D3CcB3A1278", value:"10000000000000000000"})`

#### Via data
- https://emn178.github.io/online-tools/keccak_256.html
- `0xa26759cb` is encoding of `addFunds()`
`web3.eth.sendTransaction({from:accounts[0], to:"0xfC85d443d06083d8b2eb27e8D752D70496CA82c1", data: "0xa26759cb", value:"3000000000000000000"})`


#### Via smart contract functions
- `const instance = await Faucet.deployed()`
- `instance.addFunds({value: "100...", from: accounts[0]})`