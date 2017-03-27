var express = require('express');
var router = express.Router();

var crypto = require('crypto');// 加密和解密模块
var Score = require('../models/score');

// get all
router.get('/', function(req, res, next) {
  res.render('table');
});
// ping
router.get('/u', function(req, res, next) {
  res.send('ok');
});
// query
router.get('/u/:username', function(req, res) {

   console.log(req.params.username);

   Score.get(req.params.username, function(err,score){
     res.json(score);
   });
});
// add
router.post('/p/newscore', function(req, res, next) {
  //new score
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

    else{
      // saved score if not exist
      score.save(function(err){
        if (err) {
          return res.redirect('/register');
        }
        res.send('score saved!');
      });
    }
  });
});
//update
router.put('/p', function(req, res, next) {
  //
  var score = new Score({
    username : req.body.username,
    subjectA : req.body.subjecta,
    subjectB : req.body.subjectb
  });
  // 检查用户是否存在
  Score.get(score.username, function(err,doc){
    if (!doc) {//用户名不存在
      console.log('this user not exsits!')
    }
    // 用户存在的时候 保存用户
    else{
      Score.update(score.username, score, function(err){
        if (err) {
          return res.redirect('/register');
        }
        res.send('score updated!');
      });
    }
  });
});
// delete
router.delete('/d/:username', function(req, res, next) {
  // 检查用户是否存在
  Score.get(req.params.username, function(err,doc){
    if (!doc) {// 用户名存在
      console.log('this user not exists!')
    }

    else{
      // 用户不存在的时候 保存用户
      Score.deleteit(req.params.username, function(err){
        if (err) {
          return res.redirect('/register');
        }
        res.send('score deleted!');
      });
    }
  });
});

module.exports = router;
