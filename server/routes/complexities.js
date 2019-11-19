var express = require('express');
var Complexity = require('../dao/complexities');
var response = require('../util/response');

const app = express();

app.get('/complexities', (req, res) => {
    Complexity.list()
        .then((data) => {
            response.success(res, { complexities: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.post('/', (req, res) => {
    let new_complexity = req.body;
    Complexity.create(new_complexity)
        .then((data) => {
            response.success(res, { complexities: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.put('/update/:name', (req, res) => {
    Complexity.update(req.params.name, req.body)
        .then((data) => {
            response.success(res, { complexities: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.delete('/delete/:name', (req, res) => {
    Complexity.delete(req.params.name)
        .then((data) => {
            response.success(res, { complexities: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

module.exports = app;