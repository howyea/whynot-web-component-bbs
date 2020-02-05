const path = require("path");
const server = require(path.resolve(__dirname, "./devScripts/server"));
const hotReloader = require(path.resolve(
  __dirname,
  "./devScripts/hotReloader"
));

// Activate the costum hotReloader
hotReloader.activate(server);
// start the server
server.start();
