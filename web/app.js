var express = require('express');
var routes = require('./routes/index');
var cookieParser = require('cookie-parser');


var app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use('/', routes);



app.use(function(res, req, next){
  var err = new Error('404 Not Found!');
  err.status = 404;
  next(err);
})


app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(8888);
