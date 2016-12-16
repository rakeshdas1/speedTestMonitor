var express = require('express');
// var routes = require('./routes/index');
var cookieParser = require('cookie-parser');



var app = express();

var tagline = "this is a tagline and it is pretty pointless!"
  //set view engine to ejs
app.set('view engine', 'ejs');

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
    tagline: tagline
  });
});

//about pg

app.get('/about', function(req, res) {
  res.render('routes/about');
});


app.listen(8888);
