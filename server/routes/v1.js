var express = require('express');
var profile_types = require('../routes/profile_types');
var alloys = require('../routes/alloys');
var surfaces = require('../routes/surfaces');
var complexities = require('../routes/complexities');
var presses = require('../routes/press');
var usage = require('../routes/usages');
var output = require('../routes/outputs');

const app = express();

app.use('/profile_types', profile_types);
app.use('/alloys', alloys);
app.use('/surfaces', surfaces);
app.use('/complexities', complexities);
app.use('/press', presses);

app.use('/output', output);
app.use('/usage', usage);

module.exports = app;
