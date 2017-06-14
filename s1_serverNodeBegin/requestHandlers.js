var exec = require('child_process').exec

function start (res) {
  console.log('requestHandlers start was called!')
  exec("ls -lah", function(error, stdout, stderr) {
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.write(stdout)
    res.end()
  })
}
function getJson (res) {
  console.log('requesstHandlers getJson wad called!')
  res.writeHead(200, {"Content-Type": "application/json"})
  // res.write('hello getJson')
  // res.toJSON({'name': 'guojincai'})
  res.end(JSON.stringify({'name': 'guojincai', 'age': 99, 'hobby': 'movie'}))
}

exports.start = start
exports.getJson = getJson