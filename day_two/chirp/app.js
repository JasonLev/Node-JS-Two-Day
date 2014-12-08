// The Twitter clone

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

app.use(express.static(__dirname + '/public/chirp_html'));

app.get("/", function(req, res) {
  res.render("index");
});




var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port);
});