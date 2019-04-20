const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const commonConfig = require('./webpack.common');

const config = {
  mode: 'production',

  devtool: 'cheap-module-source-map',

  entry: [
    './main.jsx',
  ],

  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  optimization: {
    nodeEnv: 'production',
    sideEffects: false, // changed to false for material-web-components
    concatenateModules: true,
    occurrenceOrder: true,
    // runtimeChunk: true,
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxAsyncRequests: 5,
      maxInitialRequests: 10,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        //   enforce: true,
        // },
      },
    },
  },
};

const prodPlugins = [
  new CleanWebpackPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
  new MiniCssExtractPlugin({
    filename: 'styles/[name].bundle.css',
  }),
  new CompressionPlugin({
    algorithm: 'gzip',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    compressionOptions: { level: 6 },
    minRatio: 0.8,
  }),
];

const prodConfig = Object.assign(
  {},
  commonConfig,
  config,
);

prodPlugins.forEach((eachPlugin) => {
  prodConfig.plugins.push(eachPlugin);
});

module.exports = prodConfig;
