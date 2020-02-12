const { resolve } = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

const PORT = 5500;

const config = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './app.jsx',
  ],

  output: {
    filename: './js/[name].dev.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  devServer: {
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000, // seems to stablise HMR file change detection
      ignored: /node_modules/,
    },
    historyApiFallback: true,
    publicPath: '/',
    host: '0.0.0.0',
    disableHostCheck: true,
    port: PORT,
  },
};

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
];

const devConfig = {
  ...commonConfig,
  ...config,
};

devPlugins.forEach((eachPlugin) => {
  devConfig.plugins.push(eachPlugin);
});

module.exports = devConfig;
