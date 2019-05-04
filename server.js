var express = require("express");
var db = require("./models");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var PORT = process.env.PORT || 8080;
var app = express();
db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log("Listening on port %s", PORT);
  });
});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride("_method"));
// Import routes and give the server access to them.
// var routes = require("./controllers/burgersController.js");
require("./routes/api-routes.js")(app);
// app.use(routes);

// Start our server so that it can begin listening to client requests.
 

