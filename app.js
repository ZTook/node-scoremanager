var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('express-partials');
//使用时新添加的，上面的依赖包是创建文件时自带的。
var dbsetting = require('./dbsetting');//数据库连接依赖包

//session会话存储于数据库依赖包（与教程中的区别）
var session = require('express-session');//session使用
var MongoStore = require('connect-mongo')(session);//mongodb使用

var routes = require('./routes/index');
var users = require('./routes/users');
var score = require('./routes/score');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 先要链接数据库
app.use(session({
  secret: dbsetting.cookieSecret,
  key: dbsetting.db,  //cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://127.0.0.1/'+dbsetting.db
  })
}));

// 为了实现用户不同登录状态下显示不同的页面成功或者错误提示信息
app.use(function(req,res,next){
  //res.locals.xxx实现xxx变量全局化，在其他页面直接访问变量名即可
  //访问session数据：用户信息
  res.locals.user = req.session.user;
  //获取要显示错误信息
  var error = 'error';//获取flash中存储的error信息

  res.locals.error = error.length ? error : null;

  //获取要显示成功信息
  var success = 'success';

  res.locals.success = success.length ? success : null;
  next();//控制权转移，继续执行下一个app。use()
});

app.use('/', routes);
app.use('/users', users);
app.use('/score', score);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
