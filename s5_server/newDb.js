// 全局安装了node驱动库:cnpm install mongodb
const MongoClient = require('mongodb').MongoClient;

const url_test = 'mongodb://localhost:27017/test_node';

MongoClient.connect(url_test, function(err, db) {
  console.log('Connected successly to server.');
});