var express = require('express');
var ProfileTypes = require('../dao/profile_types');
var response = require('../util/response');

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

module.exports = app;