var path = require("path");
var HTMLWebpackPlugin = require("html-webpack-plugin");

var SOURCE_DIR = path.resolve(__dirname, "src");
var TEMPLATE = path.resolve(SOURCE_DIR, "index.html");
var ENTRYPOINT = path.resolve(SOURCE_DIR, "index.jsx");
var BUILD_DIR = path.resolve(__dirname, "build");

// Dev server
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: TEMPLATE,
  filename: "index.html",
  inject: "head"
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
    publicPath: '/'
  },
  plugins: [ HTMLWebpackPluginConfig ],
  devtool: "source-map",
  devServer: {
    port: 8080,
    historyApiFallback: true,
    // Send API requests on localhost to API server to get around CORS.
    proxy: {}
  }
};
