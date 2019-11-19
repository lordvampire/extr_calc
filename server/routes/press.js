var express = require('express');
var Press = require('../dao/presses');
var response = require('../util/response');

const app = express();

app.get('/press', (req, res) => {
    Press.list()
        .then((data) => {
            response.success(res, { press_data: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.post('/', (req, res) => {
    let new_press = req.body;
    Press.create(new_press)
        .then((data) => {
            response.success(res, { press_data: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.put('/update/:name', (req, res) => {
    Press.update(req.params.name, req.body)
        .then((data) => {
            response.success(res, { press_data: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.delete('/delete/:name', (req, res) => {
    Press.delete(req.params.name)
        .then((data) => {
            response.success(res, { press_data: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

module.exports = app;