# Ganache Faucet
Simple web app to donate/withdraw eth from smart-contract launched on Ganache
via Metamask. 

## About
App created with create react app. Uses truffle and Ganache as backend to host
and compile smart contracts, front-end built with Bulma. Metamask to communicate
between user and smart-contract. 

## Notes
```
npx create-react-app my-app
cd my-app
npm start
```
```
nvm use 17 or 14
```

## Cleanup
1. src>App.js>remove everything in <div className="App"> and first two import
   statements
2. Delete App.css


## Install tools
```
npm install -g truffle //after using nvm use 14
truffle init
```
1. Delete comments and irrevelant information in `truffle-config.js`. Video 4.1
2. Set up Ganache project, link `truffle-config.js`
3. Open up 2 terminals in faucet, in one run `npm start` in the other run truffle commands
4. change in `truffle-config.js` port to match ganache
5. `truffle migrate` command in terminal to compile to bytecode and deploy

```
npm install bulma
```
1. In index.js: add `import 'bulma/css/bulma.min.css';`

```
npm install web3
```


## Making a smart contract
1. In contracts folder create `Faucet.sol`, can be different name from contract name
2. Copy header including SPDX liscence and solidity version from Migrations.sol
3. Build
4. `truffle compile` to create json in build folder containing ABI and bytecode
5. In migrations, make `2_detailed_description.js` for migration, keeping track of the count. See 4.6 for what to put
6. `truffle migrate`

## Recompiling
1. `truffle migrate --reset` if already migrated and want to remigrate and did not create a new contract

## Access contract with console
1. `truffle console`
### Beginner
2. `const instance = await Faucet.deployed()`
3. `instance`
4. `const funds = await instance.funds()` Can do because public variable has a getter 
5. `funds.toString()`
### Web3
2. `const instance = new web3.eth.Contract(Faucet.abi, "0x605...836EC87")` where second param is contract address via Ganache
3. `const funds = await instance.methods.funds().call()`
