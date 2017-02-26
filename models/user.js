
/*
 该文件的功能有2点：
 1. 把新用户注册信息存储于数据库。
 2. 从数据库读取指定用户的信息的功能
*/
var mongodb = require('./db');//加载数据库模块

//User构造函数，用于创建对象
function User(user) {
    //this.userid = user.userid;
    this.username = user.username;
    this.password = user.password;
    //this.userrole = user.userrole;
};

//User对象方法：把用户信息存入Mongodb
User.prototype.save = function(callback){
	var user = { //用户信息
        username: this.username,
        password: this.password
    };
    // 打开数据库
    mongodb.open(function(err, db) {

    	if (err) {

            return callback(err);
        }
        //读取users集合，users相当于数据库中的表
        db.collection('users', function(err, collection) {//定义集合名称users
        	if (err) {
                mongodb.close();
                return callback(err);
          };
          // 􏱺为name属性添加索引
          collection.ensureIndex('username', {unique: true}, function (err) {
            callback(err);
          });

          //把user对象中的数据，即用户注册信息写入users集合中
          collection.insert(user, {safe: true}, function(err, user) {
            mongodb.close();
            callback(err, user);
          });
      });
  })
};
//User对象方法：从数据库中查找指定用户的信息
User.get = function get(username, callback) {
	mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取users集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //从users集合中查找name属性为username的记录
            collection.findOne({username: username}, function(err, doc) {
            	mongodb.close();
                if (doc) {
                    //封装查询结果为User对象
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

//输出User对象
module.exports = User;
