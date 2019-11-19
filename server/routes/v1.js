var express = require('express');
var profile_types = require('../routes/profile_types');
var alloys = require('../routes/alloys');
var surfaces = require('../routes/surfaces');
var complexities = require('../routes/complexities');
var presses = require('../routes/press');

const app = express();

app.use('/profile_types', profile_types);
app.use('/alloys', alloys);
app.use('/surfaces', surfaces);
app.use('/complexities', complexities);
app.use('/press', presses);

module.exports = app;
