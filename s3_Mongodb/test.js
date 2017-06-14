// 全局安装了node驱动库:cnpm install mongodb
var MongoClient = require('mongodb').MongoClient;

var url_test = 'mongodb://localhost:27017/test';
var insertData = function(db){
  db.collection('site').insertOne({name: 'guojc1', age: 991, hobby: 'movie1'}, function(err, result){
    console.log('inserted successly');
    console.log(result);
    db.close();
    console.log('close');
  });
}

MongoClient.connect(url_test, function(err, db) {
  console.log('Connected successly to server.');
  insertData(db);
});