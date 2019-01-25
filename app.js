var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n=require("i18n-express"); // <-- require the module
var session = require('express-session')

var app = express();

// Define the port to run on
app.set('port', 8080);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
 
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["en","es"],
  textsVarName: 'translation'
}));

//routes
app.get('/', function (req, res) {
  res.render('main', {
  i18n: res
  })
});

app.get('/contact', function (req, res) {
  res.render('contact', {
  i18n: res
  })
});

app.get('/es', function (req, res) {
  res.cookie('i18n', 'es');
  res.redirect('/')
});

app.get('/en', function (req, res) {
  res.cookie('i18n', 'en');
  res.redirect('/')
});

// Listen for requests
var server = app.listen(process.env.PORT || app.get('port'), function() {
  var port = server.address().port;
  console.log('Up on port ' + port);
});


module.exports = app;
