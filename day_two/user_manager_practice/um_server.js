var express = require('express');
// var request = require('request');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Require DB module and import module
var pg = require("pg");
var models = require("./models/index.js");

// Start the app
var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

// To Read user(s)

app.get("/users/all", function(req, res) {
  models.User.findAll().success(function(user) {
      res.render("all.ejs", {
          allUsers: user
      });
  });
});

// To Create a user:

app.get("/users/new", function(req, res) {
  res.render("new");
});


// Submit a  new user:
app.post("/users/new", function(req, res) {
  models.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    age: req.body.age
  }).success(function() {
    res.redirect("/users/all");
  });
});

// To Update a user:
app.get("/users/edit/:id", function(req, res) {
  models.User.find(req.params.id).success(function(user) {
    res.render("edit.ejs", {
      userInfo: user
    });
  });
});

app.put("/users/:id", function(req, res) {
  models.User.find(req.params.id).success(function(user) {
    user. updateAttributes({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      username: req.body.username
    }).success(function() {
      res.redirect("/users/all");
    });
  });
});

// To Delete a user:
app.delete("/users/:id", function(req, res) {
  models.User.find(req.params.id).success(function(user) {
    user.destroy().success(function() {
      res.redirect("/users/all");
    });
  });
});

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port);
});