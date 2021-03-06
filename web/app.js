var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
var fs = require('fs');



var app = express();

var jsonURL =
  "http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=838ed1580f4242f09a361dfb6b8ff32c&rt=red&outputType=json";


var speedtestJson;
var arrSpeedtestJson = [0];

fs.readFile('allSpeedData.json', 'utf-8', function(err, data) {
  if (err) throw err;
  speedtestJson = data.trim().split("\n");

  for (var i = 0; i < speedtestJson.length; i++) {
    speedtestJson[i] = JSON.parse(speedtestJson[i]);
  }
  // speedtestJson = JSON.stringify(speedtestJson)
  console.log(speedtestJson);
})
var trains;

var tagline = "this is a tagline and it is pretty pointless!"
  //set view engine to ejs
app.set('view engine', 'ejs');

//request json
request({
  url: jsonURL,
  json: true
}, function(err, res, body) {
  if (!err && res.statusCode === 200) {
    trains = body.ctatt.route[0].train;
  }
})

//res.render loads ejs files
app.get('/', function(req, res) {
  var sampleJSON = [{
    name: 'John Oliver',
    age: 41
  }, {
    name: 'Jimmy Fallon',
    age: 43
  }, {
    name: 'Jimmy Kimmel',
    age: 37
  }];

  res.render('routes/index', {
    nightHosts: sampleJSON,
    tagline: tagline,
    trains: trains,
    speedtestJson: speedtestJson
  });
});

//about pg
app.get('/about', function(req, res) {
  res.render('routes/about');
});


app.listen(8888);
