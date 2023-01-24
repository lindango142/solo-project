const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "./reviews.html", 
    }),
  ],
  devServer: {
    proxy: {
      '/restaurants': {
        target: 'http://localhost:3000',
      },
      '/page': 'http://localhost:3000',
      '/build': 'http://localhost:3000'
    },
    static: {
      directory: path.join(__dirname, './client/components'),
      publicPath: '/'
    },
    compress: true,
    port: 8080,
   
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ]
  }
}