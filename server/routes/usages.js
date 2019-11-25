var express = require('express');
var Usage = require('../dao/usages');
var response = require('../util/response');

const app = express();

app.get('/usage', (req, res) => {
    Usage.list()
        .then((data) => {
            response.success(res, { usages: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.post('/', (req, res) => {
    let new_usage = req.body;
    Usage.create(new_usage)
        .then((data) => {
            response.success(res, { usages: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.put('/update/:name', (req, res) => {
    Usage.update(req.params.name, req.body)
        .then((data) => {
            response.success(res, { usages: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.delete('/delete/:name', (req, res) => {
    Usage.delete(req.params.name)
        .then((data) => {
            response.success(res, { usages: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

module.exports = app;