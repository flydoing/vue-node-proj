var express = require('express');
var app = express();

var routers = require('./routes/routers')
routers(app)

app.listen(8888);