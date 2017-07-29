const mongoose = require('mongoose')
const Schema = mongoose.Schema
const initGoods = require('./initGoods.json')
const initCarts = require('./initCarts.json')

// 用户信息的数据结构模型
const userSchema = new Schema({
  name: {type: String},
  pwd: {type: String},
  time: {type: Date, default: Date.now}
})
// 商品的的数据结构模型
const goodsSchema = new Schema({
  brand_id: Number,
  brand_cate: String,
  brand_cateName: String,
  brand_status: String,
  brand_name: String,
  brand_price: Number,
  brand_desc: String,
  brand_pic: String
})
// 购物车的的数据结构模型
const cartsSchema = new Schema({
  name: String,
  brand_id: Number,
  brand_cate: String,
  brand_name: String,
  brand_price: Number,
  brand_desc: String,
  brand_pic: String,
  cart_num: Number,
  cart_isSelect: Boolean
});

mongoose.Promise = global.Promise;
const database = mongoose.connect('mongodb://127.0.0.1:27017/test_nodeVue')
database.connection.on('error', function(error){
  console.log('数据库test_nodeVue连接失败：' + error)
  return
})
database.connection.once('open', function(){
  console.log('数据库test_nodeVue连接成功')
  // 初始化数据库
  initData();
})

const db = {
  userModel: database.model('userModel', userSchema),
  goodsModel: database.model('goodsModel', goodsSchema),
  cartsModel: database.model('cartsModel', cartsSchema)
}

const initData = function () {
  // 初始化商品goods
  db.goodsModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db goodsModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      initGoods.map(brand => {
        db.goodsModel.create(brand)
      })
      // console.log(initGoods)

    } else {
      console.log('db open not first time');
    }
  })
  // 为用户name15011760730初始化购物车内容
  db.cartsModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db cartsModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      initCarts.map(brand => {
        db.cartsModel.create(brand)
      })
      // console.log(initGoods)

    } else {
      console.log('db open not first time');
    }
  })
}

let temai = [],
  rexiao = [],
  jingpin = [];
// test promise
const getTemai = new Promise((resolve,reject) => {
  db.goodsModel.find(
    {brand_status: "temai"},
    {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, brand_status:1, _id:0},
    {limit: 3},
    function(err, doc){
      if (err) {
        console.log('temai find error!')
        reject('reject temai')
      } else {
        if (!doc) {
          temai = [];
        } else {
          temai = doc;
        }
        resolve(temai)
      }
    })
})
// rexiao
const getRexiao = new Promise((resolve,reject) => {
  db.goodsModel.find(
    {brand_status: "rexiao"},
    {brand_id:1, brand_name:1, brand_desc:1, brand_pic:1, brand_status:1, _id:0},
    {limit: 3},
    function(err, doc){
      if (err) {
        console.log('rexiao find error!');
        reject('reject rexiao')
      } else {
        if (!doc) {
          rexiao = [];
        } else {
          rexiao = doc;
        }
        resolve(rexiao)
      }
    })
})
// jingpin
const getJingpin = new Promise((resolve,reject) => {
  db.goodsModel.find(
    {brand_status: "jingpin"},
    {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, brand_status:1, _id:0},
    {limit: 4},
    function(err, doc){
      if (err) {
        console.log('jingpin find error!');
        reject('reject jingpin')
      } else {
        if (!doc) {
          jingpin = [];
        } else {
          jingpin = doc;
        }
        resolve(jingpin)
      }
    })
})

Promise.all([getTemai, getRexiao, getJingpin]).then( (res) => {
  console.log(res)
  // res.json({code: 200, msg:'', data: {"temai": temai, "rexiao": rexiao, "jingpin": jingpin}})
  // return
}).catch( (err) => {
  console.log('err all:' + err)
})

module.exports = db
