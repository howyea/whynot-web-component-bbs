var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var helpers = require("./helpers");
module.exports = {
  entry: ["./devScripts/client", "./client/index.js"],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "client/components")],
        use: [
          {
            loader: "raw-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, "node_modules")]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "client/style")],
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, "node_modules")]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./client/index.html",
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: helpers.root("client/templates"),
        to: helpers.root("dist/templates"),
        ignore: ["index.html"]
      }
    ])
  ],
  performance: {
    hints: false
  }
};
