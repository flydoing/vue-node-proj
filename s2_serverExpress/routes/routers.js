module.exports = function (app) {
  app.get('/', function (req, res) {
    res.end('home page');
  });
  app.get('/home', function(req, res){
    res.end('home page');
  });
  app.get('/detail/:id?', function(req, res){
    res.end('center page: id :' + req.params.id);
  });
  app.get('/center', function(req, res){
    res.end('center page');
  });
  app.get('/api/send', function(req, res){
    res.send({name: 'guojc', age: 99, hobby: 'movie'});
  });
  app.get('/api/json', function(req, res){
    res.json({code: 200, data: {name: 'guojc9', age: 999, hobby: 'movie'}});
    // res.status(200).json({name: 'guojc9', age: 999, hobby: 'movie'});
  });
  app.get('*', function(req, res){
    res.end('404');
  });
}