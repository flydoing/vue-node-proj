const db = require('./db')

module.exports = function (app) {
  app.all("*", function(req, res, next) {
    // res.writeHead(200, { "Content-Type": "text/plain", "Access-Control-Allow-Origin":"*" })
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8")
    // next()
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // res.header("Access-Control-Allow-Methods","*");

    next();
    // if (req.method == 'OPTIONS') {
    //   res.send(200);
    // }
    // else {
    //   next();
    // }
  });
  // api login
  app.get('/api/user/login', function (req, res) {
    // 对发来的登录数据进行验证
    if (!req.query.name) {
      // res.writeHead('Access-Control-Allow-Origin', '*');
      // res.writeHead('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, x-access-token');
      // res.writeHead('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      // res.writeHead('Access-Control-Allow-Credentials', 'true');
      res.json({code: 600, msg:'name 不能为空！'})
      return
    }
    if (!req.query.pwd) {
      res.json({code: 600, msg:'pwd 不能为空！'})
      return
    }
    db.userModel.findOne({name: req.query.name}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if (!doc) {
          res.json({code: 700, msg:'不存在该用户名：' + req.query.name})
          return
        } else {
          if (req.query.pwd != doc.pwd) {
            res.json({code: 700, msg:'密码不正确！'})
            return
          } else {
            res.json({code: 200, msg:'密码正确，登录成功'})
            return
          }
        }

      }
    })
  })
  // api register
  app.get('/api/user/register', function (req, res) {
    // 对发来的注册数据进行验证
    let name = req.query.name
    let pwd = req.query.pwd
    if (!name) {
      res.json({code: 600, msg:'name 不能为空！'})
      return
    }
    if (!pwd) {
      res.json({code: 600, msg:'pwd 不能为空！'})
      return
    }
    // 查询数据库验证注册账号、密码
    // 是否存在账号
    db.userModel.findOne({name: req.query.name}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if (doc) {
          res.json({code: 700, msg:'该用户名名已经被注册：' + name})
          return
        } else {
          db.userModel.create({
            name: name,
            pwd: pwd
          }, function (err, doc) {
            if (err) {
              res.end('注册失败:' + err)
            } else {
              res.json({code: 200, msg:'用户注册成功：' + name})
              return
            }
          })
        }

      }
    })
    // 返回注册状态
    // res.send(JSON.stringify({code: 200, data: {account: 'guojcres', pass: 111111}}))
  })
  // api index
  app.get('/api/goods/index', function (req, res) {
    let temai = [],
        rexiao = [],
        jingpin = [];
    // 1.temai
    db.goodsModel.find(
      {brand_status: "temai"},
      {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, _id:0},
      {limit: 3},
      function(err, doc){
        if (err) {
          console.log('temai find error!');
        } else {
          if (!doc) {
            temai = [];
          } else {
            temai = doc;
          }
        }
      })
    // 2.rexiao
    db.goodsModel.find(
      {brand_status: "rexiao"},
      {brand_id:1, brand_name:1, brand_desc:1, brand_pic:1, _id:0},
      {limit: 3},
      function(err, doc){
        if (err) {
          console.log('rexiao find error!');
        } else {
          if (!doc) {
            rexiao = [];
          } else {
            rexiao = doc;
          }
        }
      })
    // 3.jingpin
    db.goodsModel.find(
      {brand_status: "jingpin"},
      {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, _id:0},
      {limit: 4},
      function(err, doc){
        if (err) {
          console.log('jingpin find error!');
        } else {
          if (!doc) {
            jingpin = [];
          } else {
            jingpin = doc;
            // res
            res.json({code: 200, msg:'', data: {"temai": temai, "rexiao": rexiao, "jingpin": jingpin}})
            return
          }
        }
      })

  // 异步操作，未解决

  })
  // api cate
  app.get('/api/goods/cate', function (req, res) {
    db.goodsModel.find({}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if (!doc) {
          res.json({code: 600, msg:'没有商品', data: doc})
          return
        } else {
          res.json({code: 200, msg:'', data: doc})
          return
        }

      }
    })
  })
  // api detail
  // api cart
  // api addToCart
  app.get('*', function(req, res){
    res.end('404')
  })
}