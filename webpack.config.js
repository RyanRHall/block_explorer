var path = require("path");
var HTMLWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

var SOURCE_DIR = path.resolve(__dirname, "src");
var TEMPLATE = path.resolve(SOURCE_DIR, "index.html");
var ENTRYPOINT = path.resolve(SOURCE_DIR, "js", "index.jsx");
var BUILD_DIR = path.resolve(__dirname, "build");

// HTML Injector plugin
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: TEMPLATE,
  filename: "index.html",
  inject: "head"
});

// ENV plugin
var ENVPlugin = new webpack.EnvironmentPlugin({
  NODE_ENV: "development",
  SECRET: false
});

module.exports = {
  entry: ["@babel/polyfill", ENTRYPOINT],
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".sass"],
    alias: {
      "@src": SOURCE_DIR
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "@babel/preset-env", "@babel/preset-react" ]
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use:[ "style-loader","css-loader", "sass-loader" ]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: BUILD_DIR,
    publicPath: "/"
  },
  plugins: [ HTMLWebpackPluginConfig, ENVPlugin ],
  devtool: "source-map",
  devServer: {
    port: 8080,
    historyApiFallback: true,
    // Send API requests on localhost to API server to get around CORS.
    proxy: {}
  }
};
