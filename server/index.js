const express = require('express')
const app = express()

const api = require('./api')
api(app)

app.listen(8889)