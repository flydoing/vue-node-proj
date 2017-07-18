# vue-node-proj
my first project of learning vue-node

简介：之前刚入门vue并做好了一个简而全的纯vue2全家桶的项目，数据都是本地 json 模拟请求的；详情请移步这里：[vue-proj-demo](https://github.com/gjincai/vue-proj-demo)
为了真正做到数据库的真实存取，于是又开始入门了 node+express+mongoose 、并以此来为之前的vue页面写后台数据接口。

## 代码目录说明：

```
|--vue-node-proj
    |--client                   //前端vue页面：http://gjincai.github.io/tags/vue/
    |--s1_serverNodeBegin       //《Node入门》学习练习代码，地址：https://www.nodebeginner.org/index-zh-cn.html
    |--s2_serverExpress         //express入门学习练习
    |--s3_Mongodb               //mongodb入门学习练习：http://gjincai.github.io/tags/mongodb/
    |--s4_mongoose              //mongoose入门学习练习：http://gjincai.github.io/tags/mongodb/
    |--s5_server                //express与mongoose整合，实现注册登录的数据在mongodb的存取
    |--server               //前端client页面的正式后台：
        |--api.js               //所有接口
        |--db.js                //数据库初始化、Schema数据模型
        |--index.js             //后台服务启动入口
        |--index.js             //后台服务启动入口
        |--initCarts.json       //首次连接数据库，购物车数据的初始化
        |--initGoods.json       //首次连接数据库，所有商品数据的初始化
        |--package.json         //安装依赖：express，mongoose
```

## 项目运行
**说明：**
前端：`client` 目录；主要技术：`vue-cli + vue2 + vue-router2 + vuex2 + axios + es6 + sass + eslint`
后台：`server` 目录；主要技术：`express+mongoose`
（前后端分离，路由跳转在前端通过 vue-router 控制，后台只负责数据接口）

