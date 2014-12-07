// // server_practice.js  *** USING EXPRESS
var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


var app = express();

app.set("view engine", "ejs");


app.get("/users/first", function(req, res) {
  request('http://daretodiscover.net/user', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);

        res.render("firstname.ejs", {
          userData: data
        });
    }
  });
});

app.get("/users/last", function(req, res) {
  request('http://daretodiscover.net/user', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);

        res.render("lastname.ejs", {
          userData: data
        });
    }
  });
});

app.get("/users/all", function(req, res) {
  request('http://daretodiscover.net/user', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);

        res.render("user_api_data.ejs", {
          userData: data
        });
    }
  });
});

app.use(bodyParser.urlencoded({
    extended:true
}));

app.get("/users/new", function(req, res) {
  res.render("new_user.ejs");
});

app.post("/users/new", function(req, res) {
  request({
    method: "POST",
    uri: "http://daretodiscover.net/user",
    formData: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      username: req.body.username
    }
  }, function() {
    res.redirect("/users/all");
  });
});

app.get("/users/:id", function (req, res){
  request("http://daretodiscover.net/user/" + req.params.id, function(error, response, body) {
    res.render("edit", {
      userInfo: JSON.parse(body)
    });
  });
});

// practice the PUT and DELETE
app.use(methodOverride("_method"));


app.put("/users/:id", function(req, res) {
  request({
    method: "PUT",
    uri: "http://daretodiscover.net/user/" + req.params.id,
    formData: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      username: req.body.username
    }
  }, function() {
    res.redirect("/users/all");
  });
});

app.delete("/users/:id", function(req, res) {
    request({
        method: "DELETE",
        uri: "http://daretodiscover.net/user/" + req.params.id
    }, function() {
        res.redirect("/users/all");
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port);
});