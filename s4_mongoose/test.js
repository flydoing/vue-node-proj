var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
db.connection.on('error', function(error){
  console.log('数据库test连接失败：' + error);
});
db.connection.on('open', function(){
  console.log('数据库test连接成功');
});

var testSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number, default: 0},
  email: {type: String},
  time: {type: Date, default: Date.now}
});
var testModel = db.model('test1', testSchema); // 集合名称；集合的结构对象
// Document文档（关联数组式的对象） < Collection集合 < 数据库

// step1: 插入数据
// 插入数据，一次执行完后注释掉 start
// 插入保存一段数据
// testModel.create([
//   {name: "test1", age: 8},
//   {name: "test2", age: 18},
//   {name: "test3", age: 28},
//   {name: "test4", age: 38},
//   {name: "test5", age: 48},
//   {name: "test6", age: 58, email:"tttt@qq.com"},
//   {name: "test7", age: 68, email:"ssss@qq.com"},
//   {name: "test8", age: 18},
//   {name: "test9", age: 18, email:"rrrr@qq.com"},
//   {name: "test10",age: 18}
// ], function (error, docs) {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log('save ok');
//     console.log(docs);
//   }
// });
// 插入数据，一次执行完后注释掉 end

// step2: 查询
// find(Conditions,fields,callback);
// 省略或为空、返回所有记录；只包含name,age字段，去掉默认的_id字段；执行回调函数
testModel.find({}, {name:1, age:1, _id:0}, function(err, docs){
  if (err) {
    console.log('查询出错：' + err);
  } else {
    console.log('{}查询结果为：');
    console.log(docs);
  }
});
// 查询age大于等于28，小于等于48
testModel.find({age: {$gte: 28, $lte: 48}}, {name:1, age:1, _id:0}, function(err, docs){
  if (err) {
    console.log('查询出错：' + err);
  } else {
    console.log('$gte,$lte查询结果为：');
    console.log(docs);
  }
});
// 查询age为58、68的2条数据
testModel.find({age: {$in: [58, 68]}}, {name:1, age:1, _id:0}, function(err, docs){
  if (err) {
    console.log('查询出错：' + err);
  } else {
    console.log('$in查询结果为：');
    console.log(docs);
  }
});
// 查询name为test3、或者age为18的全部数据
testModel.find({$or: [{name: 'test3'}, {age: 18}]}, {name:1, age:1, _id:0}, function(err, docs){
  if (err) {
    console.log('查询出错：' + err);
  } else {
    console.log('$or查询结果为：');
    console.log(docs);
  }
});

// step3：游标查询
// 查询name为test3、或者age为18的全部数据；但限制只查询2条数据
testModel.find({$or: [{name: 'test3'}, {age: 18}]}, {name:1, age:1, _id:0}, {limit: 2}, function(err, docs){
  if (err) {
    console.log('查询出错：' + err);
  } else {
    console.log('limit查询结果为：');
    console.log(docs);
  }
});
// 查询age大于等于28，小于等于48;降序输出
testModel.find({age: {$gte: 28, $lte: 48}}, {name:1, age:1, _id:0}, {sort: {age: -1}}, function(err, docs){
  if (err) {
    console.log('查询出错：' + err);
  } else {
    console.log('sort查询结果为：');
    console.log(docs);
  }
});

// step4: 数据更新
var conditions = {name: 'test1'};
var update = {$set: {age: 11 }};
testModel.update(conditions, update, function(error){
  if(error) {
    console.log(error);
  } else {
    console.log('Update success!');
    testModel.find({name: 'test1'}, {name:1, age:1, _id:0}, function(err, docs){
      if (err) {
        console.log('查询出错：' + err);
      } else {
        console.log('更新test1后的查询结果为：');
        console.log(docs);  // 更新test_update后的查询结果为空数组：[ ];
                            // 更新test1后的查询结果为: [ { name: 'test1', age: 11 } ]
                            // 只能更新本来已存在的数据
      }
    });
  }
});

// step5: 数据删除
var conditions = {name: 'test2'};
testModel.remove(conditions, function(error){
  if(error) {
    console.log(error);
  } else {
    console.log('Delete success!');
    testModel.find({name: 'test2'}, {name:1, age:1, _id:0}, function(err, docs){
      if (err) {
        console.log('查询出错：' + err);
      } else {
        console.log('删除test2后的查询结果为：');
        console.log(docs);  // 删除test2后的查询结果为空数组：[ ];
      }
    });
  }
});







