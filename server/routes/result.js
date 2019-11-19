var express = require('express');
var ProfileTypes = require('../dao/profile_types');
var Alloys = require('../dao/alloys');
var Surfaces = require('../dao/surfaces');
var Complexities = require('../dao/complexities');
var response = require('../util/response');
var path = require('path');

const app = express();

app.get('/alloys', (req, res) => {
    Alloy.list()
        .then((data) => {
            response.success(res, { alloys: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});