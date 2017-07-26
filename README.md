# vue-node-proj
my first project of learning vue-node

**简介：**

之前刚入门vue并做好了一个简而全的纯vue2全家桶的项目，数据都是本地 json 模拟请求的；详情请移步这里：[vue-proj-demo](https://github.com/gjincai/vue-proj-demo)

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
        |--initCarts.json       //首次连接数据库，购物车数据的初始化
        |--initGoods.json       //首次连接数据库，所有商品数据的初始化
        |--package.json         //安装依赖：express，mongoose
```

## 项目说明：

前端：`client` 目录；主要技术：`vue-cli + vue2 + vue-router2 + vuex2 + axios + es6 + sass + eslint`

后台：`server` 目录；主要技术：`express+mongoose`

（前后端分离，路由跳转在前端通过 vue-router 控制，后台只负责数据接口）

## 项目运行：
### 环境配置：
**node.js 与 express 入门：**

学习练习代码：参考本项目中的文件夹 `vue-node-proj/s1_serverNodeBegin` 和 `vue-node-proj/s2_serverExpress`；

**mongodb的安装与配置、mongoose的基本使用：**

blog学习笔记：[http://gjincai.github.io/categories/mongodb/](http://gjincai.github.io/categories/mongodb/)；

学习练习代码：参考本项目中的文件夹 `vue-node-proj/s3_Mongodb` 和 `vue-node-proj/s3_Mongodb`；

### 运行顺序：

新建命令行窗口1，开启本地mongodb服务：

```
mongod
```

新建命令行窗口2，开启本地后台node服务器：

```
cd vue-node-proj/server
cnpm install --save
node index.js
```

新建命令行窗口3，开启本地前端vue的dev模式：

```
cd vue-node-proj/client
cnpm install --save
npm run dev --color
```

然后在浏览器打开：

```
localhost:8080
```

## 相关学习笔记
[express+mongoose 实现简易后台数据接口](http://gjincai.github.io/2017/07/26/express-mongoose-%E5%AE%9E%E7%8E%B0%E7%AE%80%E6%98%93%E5%90%8E%E5%8F%B0%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3/)

## 效果呈现：

<img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue-node/vue-node-proj/pro-vue-node-show1.jpeg" width="160px" height="285px" style="display:inline-block;margin-right:10px" /><img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue-node/vue-node-proj/pro-vue-node-show2.jpeg" width="160px" height="285px" style="display:inline-block;margin-right:10px" /><img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue-node/vue-node-proj/pro-vue-node-show3.jpeg" width="160px" height="285px" style="display:inline-block;margin-right:10px" />

<img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue-node/vue-node-proj/pro-vue-node-show4.jpeg" width="160px" height="285px" style="display:inline-block;margin-right:10px" /><img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue-node/vue-node-proj/pro-vue-node-show5.jpeg" width="160px" height="285px" style="display:inline-block;margin-right:10px" /><img src="http://ohe5avf3y.bkt.clouddn.com/pro/vue-node/vue-node-proj/pro-vue-node-show6.jpeg" width="160px" height="285px" style="display:inline-block;margin-right:10px" />

