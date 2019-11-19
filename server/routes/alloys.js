var express = require('express');
var Alloy = require('../dao/alloys');
var response = require('../util/response');

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

app.post('/', (req, res) => {
    let new_alloy = req.body;
    Alloy.create(new_alloy)
        .then((data) => {
            response.success(res, { alloys: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.put('/update/:name', (req, res) => {
    Alloy.update(req.params.name, req.body)
        .then((data) => {
            response.success(res, { alloys: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.delete('/delete/:name', (req, res) => {
    Alloy.delete(req.params.name)
        .then((data) => {
            response.success(res, { alloys: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

module.exports = app;