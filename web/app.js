var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var Readable  = require('stream').Readable;
var Parser = require('newline-json').Parser;
var Stringifier = require('newline-json').Stringifier;





var app = express();
var parser = new Parser();
var stringifier = new Stringifier();

var jsonURL = "http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=838ed1580f4242f09a361dfb6b8ff32c&rt=red&outputType=json";


var speedtestJson;

fs.readFile('../allSpeedData.json', 'utf-8', function(err,data) {
  if (err) throw err;
  speedtestJson = data;
  console.log(readable());
})
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

function readable (){
  var n = 100;
  var nsjrs = new Readable();
  nsjrs.__read = function __read (){
    if (n--){
      nsjrs.push('{"this":"is","js":"on"}\n');
    }
    else nsjrs.push(null);
  }
  nsjrs.pipe(parser);
  var json = parser.pipe(stringifier);
  return json;

}
