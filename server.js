//Dependencies ////////////////////////////////////////////
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;

//Requiring our models for syncing
var db = require("./models");

//Sets up the Express App to handle data parsing
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));
//parse application/json
app.use(bodyParser.json());
//**********SERVE UP STATIC ASSETS***********/
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


//Routes
require("./routes/html-routes.js")(app);
require("./routes/symbols-api-routes.js")(app);
require("./routes/stocks-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/sold-api-routes.js")(app);


//Syncing our Sequelize models and then starting our Express app
db.sequelize.sync({ }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});