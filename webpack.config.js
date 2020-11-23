const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/scripts.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',  
  devServer: {     
    contentBase: './dist'      
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'prism',
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'sketch', to: 'sketch' }
      ],
    })
  ],
  module: {
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
      ],
    },
    {
      test: /\.css$/,
      use: [
      "style-loader", 
      "css-loader"
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader?name=[name].[ext]',
        },
      ],
    },
    // {
    //   test: /\.(js|jsx)$/,
    //   exclude: /node_modules/,
    //   loader: "babel-loader",
    //   options: {
    //     presets: [
    //         '@babel/preset-env',
    //         '@babel/preset-'
    //     ],
    //     plugins: [
    //         '@babel/transform-runtime'
    //     ]
    //   }
    // }
  ],
  }
};
