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
    // // 1.temai
    // db.goodsModel.find(
    //   {brand_status: "temai"},
    //   {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, _id:0},
    //   {limit: 3},
    //   function(err, doc){
    //     if (err) {
    //       console.log('temai find error!');
    //     } else {
    //       if (!doc) {
    //         temai = [];
    //       } else {
    //         temai = doc;
    //       }
    //     }
    //   })
    // // 2.rexiao
    // db.goodsModel.find(
    //   {brand_status: "rexiao"},
    //   {brand_id:1, brand_name:1, brand_desc:1, brand_pic:1, _id:0},
    //   {limit: 3},
    //   function(err, doc){
    //     if (err) {
    //       console.log('rexiao find error!');
    //     } else {
    //       if (!doc) {
    //         rexiao = [];
    //       } else {
    //         rexiao = doc;
    //       }
    //     }
    //   })
    // // 3.jingpin
    // db.goodsModel.find(
    //   {brand_status: "jingpin"},
    //   {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, _id:0},
    //   {limit: 4},
    //   function(err, doc){
    //     if (err) {
    //       console.log('jingpin find error!');
    //     } else {
    //       if (!doc) {
    //         jingpin = [];
    //       } else {
    //         jingpin = doc;
    //         // res
    //         res.json({code: 200, msg:'', data: {"temai": temai, "rexiao": rexiao, "jingpin": jingpin}})
    //         return
    //       }
    //     }
    //   })

    // 异步操作，未解决
    // 1.temai
    // db.goodsModel.find(
    //   {brand_status: "temai"},
    //   {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, _id:0},
    //   {limit: 3},
    //   function(err, doc){
    //     if (err) {
    //       console.log('temai find error!');
    //     } else {
    //       if (!doc) {
    //         temai = [];
    //       } else {
    //         temai = doc;
    //       }
    //     }
    //   })
    //   .then( () => {
    //     // 2.rexiao
    //     db.goodsModel.find(
    //       {brand_status: "rexiao"},
    //       {brand_id:1, brand_name:1, brand_desc:1, brand_pic:1, _id:0},
    //       {limit: 3},
    //       function(err, doc){
    //         if (err) {
    //           console.log('rexiao find error!');
    //         } else {
    //           if (!doc) {
    //             rexiao = [];
    //           } else {
    //             rexiao = doc;
    //           }
    //         }
    //       })
    //       .then( () => {
    //       // 3.jingpin
    //       db.goodsModel.find(
    //         {brand_status: "jingpin"},
    //         {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, _id:0},
    //         {limit: 4},
    //         function(err, doc){
    //           if (err) {
    //             console.log('jingpin find error!');
    //           } else {
    //             if (!doc) {
    //               jingpin = [];
    //             } else {
    //               jingpin = doc;
    //             }
    //           }
    //         })
    //         .then( () => {
    //         // res
    //         res.json({code: 200, msg:'', data: {"temai": temai, "rexiao": rexiao, "jingpin": jingpin}})
    //         return
    //       })
    //     })
    //   })
    //   .catch( (err) => {
    //     res.json({code: 200, msg:'', data: {"temai": temai, "rexiao": rexiao, "jingpin": jingpin}})
    //     return
    //   })

    // promise 解决
    // temai
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
            console.log('jingpin find error!')
            reject('reject jingpin')
          } else {
            if (!doc) {
              jingpin = []
            } else {
              jingpin = doc
            }
            resolve(jingpin)
          }
        })
    })

    const p_all = Promise.all([getTemai, getRexiao, getJingpin])

    p_all.then( (suc) => {
      let data = {
        "temai": suc[0],
        "rexiao": suc[1],
        "jingpin": suc[2]
      }
      res.json({code: 200, msg:'', data: data})
      return
    }).catch( (err) => {
      console.log('err all:' + err)
      res.json({code: 600, msg:'查询出错', data: data})
      return
    })
  })
  // 精品下拉加载更多api index/jingpin
  app.get('/api/goods/index/jingpin', function (req, res) {
    let nowLength = parseInt(req.query.nowLength)
    db.goodsModel.find(
      {brand_status: "jingpin"},
      {brand_id: 1, brand_name: 1, brand_price: 1, brand_pic: 1, _id: 0},
      {limit: 4, skip:nowLength},
      function (err, doc) {
        if (err) {
          console.log('jingpin find error!');
          console.log(err)
        } else {
          if (!doc) {
            // res
            res.json({code: 600, msg: '没有了', data: ''})
            return
          } else {
            // res 加载效果，故意延时1s
            setTimeout( ()=> {
              res.json({code: 200, msg: '', data: doc})
              return
            }, 1000)
          }
        }
      }
    )
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
  app.get('/api/goods/detail', function (req, res) {
    let brand_id = req.query.brand_id
    db.goodsModel.findOne({brand_id: brand_id}, {__v: 0, _id: 0}, function(err, doc){
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
  // api addToCart
  app.get('/api/goods/addToCart', function (req, res) {
    let brand_id = req.query.brand_id
    let name = req.query.name
    let newCart = req.query
    db.cartsModel.update({brand_id: brand_id, name: name}, {$set:newCart}, {upsert:true}, function(err){
        if (err) {
          console.log('加入购物车失败：' + err);
          res.json({code: 700, msg:'加入购物车失败：' + err})
          return
        } else {
          // add
          res.json({code: 200, msg:'加入购物车成功'})
          return
        }
    })
  })
  // api carts
  app.get('/api/goods/carts', function (req, res) {
    let name = req.query.name
    db.cartsModel.find({name: name}, {__v: 0, _id: 0}, function(err, doc){
      if (err) {
        console.log('购物车查询出错：' + err);
        res.json({code: 700, msg:'购物车查询出错：' + err})
        return
      } else {
        if (!doc) {
          res.json({code: 600, msg:'购物车为空', data: doc})
          return
        } else {
          res.json({code: 200, msg:'购物车返回成功', data: doc})
          return
        }
      }
    })
  })
  // api delectCart
  app.get('/api/goods/delectCart', function (req, res) {
    let brand_id = req.query.brand_id
    let name = req.query.name
    db.cartsModel.remove({brand_id: brand_id, name: name}, function(err){
      if (err) {
        console.log('购物车删除：' + err);
        res.json({code: 700, msg:'购物车删除：' + err})
        return
      } else {
        // add
        res.json({code: 200, msg:'购物车删除成功'})
        return
      }
    })
  })

  app.get('*', function(req, res){
    res.end('404')
  })
}