(function() {
  "use strict";
  const path = require("path");
  const chokidar = require("chokidar");

  function activate(server) {
    /**
     * Here, we use Chokidar to force page reloading for some other file types
     * like html changes or php if you want
     */
    const watcher = chokidar.watch("../client");
    watcher.on("ready", function() {
      console.log("Initial scan complete. Ready for changes");
    });
    watcher.on("change", function(path) {
      console.log("File [" + path + "] changed !");
      // reload the client on file changes
      server.reloadClient();
    });
  }
  // here we export an activate function to activate the watcher
  module.exports = {
    activate: activate
  };
})();
