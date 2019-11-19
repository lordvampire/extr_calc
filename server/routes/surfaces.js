var express = require('express');
var Surface = require('../dao/surfaces');
var response = require('../util/response');

const app = express();

app.get('/surfaces', (req, res) => {
    Surface.list()
        .then((data) => {
            response.success(res, { surfaces: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.post('/', (req, res) => {
    let new_surface = req.body;
    Surface.create(new_surface)
        .then((data) => {
            response.success(res, { surfaces: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.put('/update/:name', (req, res) => {
    Surface.update(req.params.name, req.body)
        .then((data) => {
            response.success(res, { surfaces: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.delete('/delete/:name', (req, res) => {
    Surface.delete(req.params.name)
        .then((data) => {
            response.success(res, { surfaces: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

module.exports = app;