var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');



var app = express();

var jsonURL = "http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=838ed1580f4242f09a361dfb6b8ff32c&rt=red&outputType=json";

var trains;

var tagline = "this is a tagline and it is pretty pointless!"
  //set view engine to ejs
app.set('view engine', 'ejs');

//request json
request({
  url:jsonURL,
  json: true
},function(err, res, body){
  if(!err && res.statusCode === 200){
    trains = body.ctatt.route[0].train;
    console.log(trains);
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
    trains: trains
  });
});

//about pg
app.get('/about', function(req, res) {
  res.render('routes/about');
});


app.listen(8888);
