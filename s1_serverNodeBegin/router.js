function route (handles, pathname, res) {
  console.log('route for: ' + pathname)
  if (typeof handles[pathname] === 'function') {
    // handles.pathname   // 读出来的是 '/start',不存在该方法
    handles[pathname](res)
  } else {
    console.log("No request handler found for " + pathname)
    res.writeHead(404, {"Content-Type": "text/plain"})
    res.write("404 Not found");
    res.end();
  }
}

exports.route = route