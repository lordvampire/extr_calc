var express = require('express');
var Die = require('../dao/dies');
var response = require('../util/response');

const app = express();

app.get('/dies', (req, res) => {
    Die.list()
        .then((data) => {
            response.success(res, { dies: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.post('/', (req, res) => {
    let new_die = req.body;
    Die.create(new_die)
        .then((data) => {
            response.success(res, { dies: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.put('/update/:name', (req, res) => {
    Die.update(req.params.name, req.body)
        .then((data) => {
            response.success(res, { dies: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.delete('/delete/:name', (req, res) => {
    Die.delete(req.params.name)
        .then((data) => {
            response.success(res, { dies: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

module.exports = app;