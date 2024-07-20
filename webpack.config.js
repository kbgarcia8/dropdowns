const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Dynamic UI Demo',
      header: 'Dynamic UI Demo',
      metaDesc: 'Demo of dropdowns and image carousel',
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyPlugin({ //plug-in if dependencies are in a folder, downside is not in hash. Takes up space
      patterns: [
        { from: "src/images", to: "images" },
        { from: "src/styles", to: "styles" }
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  mode: 'development',
  output: {
    clean: true,
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'general_assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};