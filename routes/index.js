var express = require('express');
var router = express.Router();
//加载生成MD5值依赖模块
var crypto = require('crypto');// 加密和解密模块
var User = require('../models/user');
//var Post = require("../models/post.js");//加载用户发表微博模块

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// 用户页面的功能是显示该用户发表的所有微博信息
router.get('/u/:username', function(req, res) {

   console.log(req.params.username);

   User.get(req.params.username, function(err,user){


       res.json(user);
   });
});


// 用户注册
router.get('/register', checkNotLogin);//页面权限控制，注册功能只对未登录用户可用
router.get('/register', function(req, res) {
	res.render('register');
});

router.post('/register', checkNotLogin);
router.post('/register', function(req, res) {
  // 用户名 和 密码 不能为空
  if (req.body.username == "" || req.body.userpwd == "" || req.body.pwdrepeat == "") {
    //使用req.body.username获取提交请求的用户名，username为input的name
    return res.redirect('/register');//返回reg页面
  }
  // 两次输入的密码不一致，提示信息
  if(req.body.userpwd != req.body.pwdrepeat) {
    console.log('password wrong')
    return res.redirect('/register');
  }
  //把密码转换为MD5值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.userpwd).digest('base64');

  //用新注册用户信息对象实例化User对象，用于存储新注册用户和判断注册用户是否存在
  var newUser = new User({
    username: req.body.username,
    password: password,
  });
  // 检查用户是否存在
  User.get(newUser.username, function(err,user){
    if (user) {//用户名存在
      console.log('user exsits')
      return res.redirect('/');
    }
    // 用户不存在的时候 保存用户
    newUser.save(function(err){
      if (err) {
        return res.redirect('/register');
      }
      req.session.user = newUser; //保存用户名，用于判断用户是否已登录
      res.redirect('/users');
    });

  });
});

router.get('/login', checkNotLogin);
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', checkNotLogin);
router.post('/login', function(req, res) {
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.userpwd).digest('base64');
  //判断用户名和密码是否存在和正确
  User.get(req.body.username,function(err,user){

    if(!user) {
      console.log('error, user not exists');
      return res.redirect('/login');
    }

    if(user.password != password) {
      console.log('error, password wrong');
      return res.redirect('/login');
    }
    // 保存用户信息
    req.session.user = user;
    res.redirect('/users');
  });
});

router.get('/ping', function(req, res, next) {
  res.send('ok');
});

// 用户注销操作
router.get('/logout',checkLogin);
router.get('/logout', function(req, res) {
    req.session.user = null;//清空session
    console.log('logout success');
    res.redirect('/login');
});

function checkNotLogin(req,res,next){
  // 如果从session里面获取用户已存在的话
  if (req.session.user) {
    console.log("already")
    return res.redirect('/');
  }
  next();
  //控制权转移：当不同路由规则向同一路径提交请求时，在通常情况下，请求总是被第一条路由规则捕获，
  // 后面的路由规则将会被忽略，为了可以访问同一路径的多个路由规则，使用next()实现控制权转移。
}
function checkLogin(req,res,next){
  if (!req.session.user){
    console.log("not ready")
    return res.redirect('/login');
  }
  //已登录转移到下一个同一路径请求的路由规则操作
  next();
}

module.exports = router;
