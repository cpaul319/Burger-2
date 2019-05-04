var db = require("../models");

// Routes
// =============================================================
module.exports = app => {
  // on page load or on redirects
  app.get("/", (req, res) => {
    res.redirect("/burgers");
  });

  // on page load or on redirects
  app.get("/burgers", (req, res) => {
    var query = {};
    if (req.query.UserId) {
      query.User = req.query.UserId;
    }

    // if the UserId field of the burgers table is not empty, include the user of that id in the results
    db.Burger
      .findAll({
        include: db.User,
        where: query
      })
      .then(data => {
        var hbsObject = { burgers: data };
        res.render("index", hbsObject);
      });
  });

  // when submit button is pressed
  app.post("/burgers/create", (req, res) => {
    db.Burger
      .create({
        name: req.body.name
      })
      .then(() => {
        res.redirect("/burgers");
      });
  });

  // when devour button is pressed
  app.put("/burgers/update", (req, res) => {
    var userName = req.body.eaten_by;
    // var userNameTrim = userName.toLowerCase().trim();

    db.User
      .findAll({
        where: { user_name: userName }
      })
      .then(data => {
        if (data.length > 0) {
          // if customer already exists in database, devour burger
          console.log("customer already exists");
          devour(data[0].dataValues.id);
        } else {
          // if customer does not exist in database, create new customer, then devour burger
          console.log("creating new customer");
          db.User
            .create({
              user_name: req.body.eaten_by
            })
            .then(data => devour(data.dataValues.id));
        }
      });

    function devour(user) {
      console.log("devouring");

      // mark burger as devoured and record the id of the customer who ate it
      db.Burger
        .update(
          {
            devoured: true,
            UserId: user
          },
          {
            where: { id: req.body.burger_id }
          }
        )
        .then(() => {
          res.redirect("/burgers");
        });
    }
  });
};
// app.delete("/user/:id", function(req, res) {
//   // We just have to specify which user we want to destroy with "where"
//   db.Todo.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(dbTodo) {
//     res.json(dbTodo);
//   });

// });

