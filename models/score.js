
/*
 该文件的功能有2点：
 1. 把新用户注册信息存储于数据库。
 2. 从数据库读取指定用户的信息的功能
*/
var mongodb = require('./db');//加载数据库模块

//User构造函数，用于创建对象
function Score(score) {
    this.username = score.username;
    this.subjectA = score.subjectA;
    this.subjectB = score.subjectB;
};

//User对象方法：把用户信息存入Mongodb
Score.prototype.save = function(callback){
	var score = { //用户信息
    username : this.username,
    subjectA : this.subjectA,
    subjectB : this.subjectB
  };
  // 打开数据
  mongodb.open(function(err, db) {

    if (err) {
      return callback(err);
    }
    //读取score集合，score相当于数据库中的表
    db.collection('scores', function(err, collection) {//定义集合名称score
      if (err) {
        mongodb.close();
        return callback(err);
      };
      //为username属性添加索引
      collection.ensureIndex('username', {unique: true}, function (err) {
        callback(err);
      });
      //把score对象中的数据，即用户注册信息写入score集合中
      collection.insert(score, {safe: true}, function(err, score) {
        mongodb.close();
        callback(err, score);
      });
    });
  })
};
//User对象方法：从数据库中查找指定用户的信息
Score.get = function get(username, callback) {
	mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('scores', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //从scores集合中查找name属性为username的记录
            collection.findOne({username: username}, function(err, doc) {
            	mongodb.close();
              if (doc) {
                //封装查询结果为User对象
                var score = new Score(doc);
                callback(err, score);
              }
              else {
                callback(err, null);
              }
            });
        });
    });
};

//User对象方法：从数据库中更新指定用户的信息
Score.update = function update(username, newscore, callback) {
	mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('scores', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //从scores集合中查找name属性为username的记录
            collection.update({username: username}, newscore, function(err, doc) {
            mongodb.close();
            if (doc) {
            //封装查询结果为User对象
            var score = new Score(doc);
              callback(err, score);
            }
            else {
              callback(err, null);
            }
            });
        });
    });
};

//User对象方法：从数据库中更新指定用户的信息
Score.delete = function delete(username, callback) {
	mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('scores', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //从scores集合中查找name属性为username的记录
            collection.deleteOne({username: username}, function(err, doc) {
            mongodb.close();
            if (doc) {
            //封装查询结果为User对象
            var score = new Score(doc);
              callback(err, score);
            }
            else {
              callback(err, null);
            }
            });
        });
    });
};

//输出User对象
module.exports = Score;
