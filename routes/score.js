var express = require('express');
var router = express.Router();

var crypto = require('crypto');// 加密和解密模块
var Score = require('../models/score');
//var Post = require("../models/post.js");//加载用户发表微博模块

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('table');
});

router.get('/u', function(req, res, next) {
  res.send('ok');
});

// 用户页面的功能是显示该用户发表的所有微博信息
router.get('/u/:username', function(req, res) {

   console.log(req.params.username);

   Score.get(req.params.username, function(err,score){
     res.json(score);
   });
});

router.post('/p/update', function(req, res, next) {

  console.log("query: " + req.body.username);
  // 用户名 和 密码 不能为空
  if (req.body.username == "") {
    //使用req.body.username获取提交请求的用户名，username为input的name
    return res.redirect('/');//返回reg页面
  }

  //用新注册用户信息对象实例化User对象，用于存储新注册用户和判断注册用户是否存在
  var score = new Score({
    username : req.body.username,
    subjectA : req.body.subjecta,
    subjectB : req.body.subjectb
  });
  // 检查用户是否存在
  Score.get(score.username, function(err,doc){
    if (doc) {//用户名存在
      console.log('this user has socre already!')
    }
    // 用户不存在的时候 保存用户
    score.save(function(err){
      if (err) {
        return res.redirect('/register');
      }
      res.send('score saved!');
    });
  });
});

module.exports = router;
