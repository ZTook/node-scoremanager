var express = require('express');
var router = express.Router();

var crypto = require('crypto');// 加密和解密模块
var User = require('../models/user');
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

   User.get(req.params.username, function(err,user){
       res.json(user);
   });
});

router.get('p/:pID/remove', function(req, res, next) {
  res.render('index', { title:'express'});
});

router.post('p/:pID/update', function(req, res, next) {
  res.send('ok');
});

module.exports = router;
