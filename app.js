var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser= require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var headoffice= require('./routes/headofficeCatalog');
var adminCatalogue= require('./routes/adminCatalog');
var murti= require('./routes/shopCatalogue');
var app = express();
var router= express.Router();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

/////App Routes

app.use('/', indexRouter);
app.use('/head',headoffice);
app.use('/admin',adminCatalogue);
app.use('/shop',murti); 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports= app;
