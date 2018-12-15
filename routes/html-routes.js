var path = require("path");

// Routes
module.exports = function(app) {

  //index route loads home.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

};