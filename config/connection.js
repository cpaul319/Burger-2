// Set up MySQL connection.
var mysql = require("mysql");
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  } else {
  var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "trilogy",
  password: "password123",
  database: "burger_db"
  });
  }

// var connection = mysql.createConnection({
//   host: "us-cdbr-iron-east-02.cleardb.net",
//   port: 3306,
//   user: "b39ca02b6544a3",
//   password: "88f1f4a5",
//   database: "heroku_064343c347264e4"
// });

 
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
