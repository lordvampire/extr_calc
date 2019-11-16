var routes = require('../routes');
var express = require('express');
const app = express();

app.use('/', routes);

module.exports = app;
