'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin')
  .default;
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

// const createLintingRule = () => ({
//   test: /\.(js|vue)$/,
//   loader: 'eslint-loader',
//   enforce: 'pre',
//   include: [resolve('src'), resolve('test')],
//   options: {
//     formatter: require('eslint-friendly-formatter'),
//     emitWarning: !config.dev.showEslintErrorsInOverlay
//   }
// });

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/web/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].bundles.js'),
    globalObject: 'this',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.ts', 'tsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/web/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/web/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new ManifestPlugin(),
    new DashboardPlugin(),
    new ProgressBarPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'Webpack success!',
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new WebpackDeepScopeAnalysisPlugin(),
    new CleanWebpackPlugin()
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
