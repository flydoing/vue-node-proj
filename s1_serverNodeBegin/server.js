var http = require("http");
var url = require('url');

function start(route, handles) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname
    console.log("Request received pathname:" + pathname)

    route(handles, pathname, res)

    // res.writeHead(200, {"Content-Type": "text/plain"})
    // res.write("Hello node")
    // res.end()
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
exports.start = start;