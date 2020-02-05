const path = require("path");
// import express
const express = require("express");

// import webpack and the dev & hot middlewares
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

function createServer() {
  // Step 1: create the express instance
  const app = express();

  // Step 2: Create & configure a webpack compiler
  const webpackConf = require("../webpack.config.js");
  const webpackCompiller = webpack(webpackConf);

  const hotMiddleware = webpackHotMiddleware(webpackCompiller);
  const devMiddleWare = webpackDevMiddleware(webpackCompiller, {
    publicPath: webpackConf.output.publicPath
  });

  // Step 3: Attach the dev middleware and hot middleware to the server
  app.use(devMiddleWare);
  app.use(hotMiddleware);
  app.use(express.static(path.resolve(__dirname, "./")));

  function startServer() {
    app.listen(3001, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      // log server running
      console.log("Listening at http://localhost:3001/");
    });
  } // end function start server

  /**
   *
   */
  function reloadClient() {
    hotMiddleware.publish({ action: "reload" });
  } // end function RelaodClient

  return {
    start: startServer,
    reloadClient: reloadClient
  };
}
module.exports = createServer();
