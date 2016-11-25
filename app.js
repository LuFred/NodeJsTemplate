var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('./middlewares/log');
var routes=require('./routes');
var session=require('express-session');
var configLite=require('config-lite');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//注册ejs模板为html页
app.engine('.html', require('ejs').__express);
//设置视图模板的默认后缀名为.html
app.set('view engine', 'html');


// 定义icon图标
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(configLite.session);
app.use(session(configLite.session));


//static file handler
//https://github.com/expressjs/serve-static
var static_options = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '30d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};
app.use(express.static(path.join(__dirname, 'assets'),static_options));
//session handler

//loger handler
logger.use(app);
//router handler
routes.use(app);

//console.log("locals="+JSON.stringify("app.js================"+app.locals));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
console.log(err+"-----------------");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  if(!err.status){
    logger.dateLog.error(err);
  }
  res.render('error');
});

module.exports = app;
