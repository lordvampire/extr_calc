var express = require('express');
var ProfileTypes = require('../dao/profile_types');
var Alloys = require('../dao/alloys');
var Surfaces = require('../dao/surfaces');
var Complexities = require('../dao/complexities');
var response = require('../util/response');
var path = require('path');

const app = express();


app.get('/profile_types', (req, res) => {
    ProfileTypes.list()
        .then((data) => {
            response.success(res, { types: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.get('/alloys', (req, res) => {
    Alloys.list()
        .then((data) => {
            response.success(res, { types: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.get('/surfaces', (req, res) => {
    Surfaces.list()
        .then((data) => {
            response.success(res, { types: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.get('/complexities', (req, res) => {
    Complexities.list()
        .then((data) => {
            response.success(res, { types: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

module.exports = app;