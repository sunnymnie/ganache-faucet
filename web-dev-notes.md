# Web dev notes

## Bulma
- `mr-2` is margin-right 2

## General
- add `debugger;` in code to debug with inspect element

## Metamask
- when connecting metamask ganache, use id 1337. Lowercase http. currency:
  `eth`. 
- `npm install @metamask/detect-provider`

## Webpack issue with web3
- https://github.com/ChainSafe/web3.js#web3-and-create-react-app
- `npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process`
- create `config-overrides.js` and add 
```
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}
```
- in `package.json` have:
```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```