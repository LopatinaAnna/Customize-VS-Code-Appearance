//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const webExtConfig = {
  mode: 'none',
  target: 'web',
  entry: './src/extension.ts',
  output: {
    filename: 'extension-web.js',
    path: path.resolve(__dirname, 'out'),
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      // Polyfills for web environment - fallback modules
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};

/**@type {import('webpack').Configuration}*/
const desktopExtConfig = {
  mode: 'none',
  target: 'node',
  entry: './src/extension.ts',
  output: {
    filename: 'extension.js',
    path: path.resolve(__dirname, 'out'),
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};

module.exports = [webExtConfig, desktopExtConfig];
