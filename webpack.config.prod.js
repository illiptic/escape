var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
        { from: 'public' }
    ], {
      ignore: [
        '.*'
      ]
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },{
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        include: path.join(__dirname, 'src')
      },{
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?name=static/src/app/assets/[name].[ext]'
      }
    ]
  }
};
