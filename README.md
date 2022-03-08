# Getting Started with Create React App

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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
