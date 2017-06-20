const db = require('./db')

module.exports = function (app) {
  app.all("*", function(req, res, next) {
    // res.writeHead(200, { "Content-Type": "text/plain" })
    // db.init(next)
    next()
  });
  app.get('/api/user/login', function (req, res) {
    // 对发来的登录数据进行验证
    if (!req.query.name) {
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
      } else {
        if (!doc) {
          res.json({code: 700, msg:'不存在该用户名：' + req.query.name})
          return
        } else {
          if (req.query.pwd != doc.pwd) {
            res.json({code: 700, msg:'密码不正确！'})
            return
          } else {
            res.json({code: 700, msg:'密码正确，登录成功'})
            return
          }
        }

      }
    })
    // 查询数据库验证账号、密码
    // 返回登录状态
    // res.send(JSON.stringify({code: 200, data: {account: 'guojc', pass: 111111}}))
  })
  app.get('/api/user/register', function (req, res) {
    // 对发来的注册数据进行验证
    // 查询数据库验证注册账号、密码
    console.log(req.url)
    db.userModel.create({
      name: 'guojctest1',
      pwd: 111111
    }, function (err, doc) {
      if (err) {
        res.end('err:' + err)
      } else {
        // console.log(doc)
        res.send(doc)
      }
    })
    // 返回注册状态
    // res.send(JSON.stringify({code: 200, data: {account: 'guojcres', pass: 111111}}))
  })
  app.get('*', function(req, res){
    res.end('404')
  })
}