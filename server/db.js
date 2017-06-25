const mongoose = require('mongoose')
const Schema = mongoose.Schema

const database = mongoose.connect('mongodb://127.0.0.1:27017/test_nodeVue')
database.connection.on('error', function(error){
  console.log('数据库test_nodeVue连接失败：' + error)
  return
})
database.connection.once('open', function(){
  console.log('数据库test_nodeVue连接成功')
})

// const init = function (callback) {
//   // const mongoose = require('mongoose')
//   database = mongoose.connect('mongodb://127.0.0.1:27017/test_nodeVue')
//   database.connection.on('error', function(error){
//     console.log('数据库test_nodeVue连接失败：' + error)
//     // return
//   })
//   database.connection.on('open', function(){
//     console.log('数据库test_nodeVue连接成功')
//     callback()
//   })
// }

const userSchema = new Schema({
  name: {type: String},
  pwd: {type: String},
  time: {type: Date, default: Date.now}
})
const goodsSchema = new Schema({
  brand_id: Number,
  brand_cate: String,
  brand_name: String,
  brand_price: Number,
  brand_desc: String,
  brand_pic: String
})
const cartsSchema = new Schema({
  name: String,
  allSelect: Boolean,
  allSelectPrice: Number,
  carts: [
    {
      brand_id: Number,
      brand_cate: String,
      brand_name: String,
      brand_price: Number,
      brand_desc: String,
      brand_pic: String,
      cart_num: Number,
      cart_isSelect: Boolean
    }
  ]
});


const db = {
  // init: init,
  userModel: database.model('userModel', userSchema),
  goodsModel: database.model('goodsModel', goodsSchema),
  cartsModel: database.model('cartsModel', cartsSchema)
}

module.exports = db
