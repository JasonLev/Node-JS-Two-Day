// // server_practice.js  *** WITHOUT USING EXPRESS
// var http = require("http");

// // this is the callback function:
// function greet(req, res) {
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.write("Hello World");
//     res.end();
// }

// var server = http.createServer(greet);

// server.listen(3000);



// // server_practice.js  *** USING EXPRESS
var express = require('express');
var request = require('request');

var app = express();


app.get('/hello/:name', function (req, res) {
  res.send('Hello World! ' + req.params.name);
});

app.get("/greet/:name/:lastname", function(req, res) {
    res.send("Hello " + req.params.name + " " + req.params.lastname);
});

// Making a calculator:
// app.get("/add/:num1/:num2", function(req, res) {
//     var sum = parseInt(req.params.num1) + parseInt(req.params.num2)
//     res.send("Sum: " + req.params.num1 + "+" + req.params.num2 + "= " + sum);
// });
// app.get("/subtract/:num1/:num2", function(req, res) {
//     var difference = parseInt(req.params.num1) - parseInt(req.params.num2)
//     res.send("Difference: " + req.params.num1 + "-" + req.params.num2 + "= " + difference);
// });
// app.get("/multiply/:num1/:num2", function(req, res) {
//     var product = parseInt(req.params.num1) * parseInt(req.params.num2)
//     res.send("Product: " + req.params.num1 + "*" + req.params.num2 + "= " + product);
// });
// app.get("/divide/:num1/:num2", function(req, res) {
//     var quotient = parseInt(req.params.num1) / parseInt(req.params.num2)
//     res.send("Quotient: " + req.params.num1 + "/" + req.params.num2 + "= " + quotient);
// });


// ejs practice:
app.set("view engine", "ejs");

app.get("/greeting", function(req, res) {
  res.render("index.ejs", {
    greeting: "Hello!"
  });
});

app.get("/getgoogle", function(req, res) {
  request("http://www.google.com", function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // Print the google web page.
    }
  });
});



// fb exercise
app.get("/getfb", function(req, res) {
  request("http://www.facebook.com", function(error, response, body) {
    if (!error && response.statusCode == 200) {
        res.render("fb.ejs", {
          fb: body
        });
    }
  });
});

app.get("/userdata", function(req, res) {
  request('http://daretodiscover.net/user', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);

        res.render("user.ejs", {
          userData: data
        });
    }
  });
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});