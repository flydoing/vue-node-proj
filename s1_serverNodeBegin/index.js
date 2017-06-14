var server = require('./server')
var router = require('./router')
var requestHandlers = require('./requestHandlers')

var handles = {
  '/': requestHandlers.start,
  '/start': requestHandlers.start,
  '/getJson': requestHandlers.getJson
}



server.start(router.route, handles)