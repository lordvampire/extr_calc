var express = require('express');
var Output = require('../dao/outputs');
var response = require('../util/response');

const app = express();

app.post('/', (req, res) => {
    let new_output = req.body;
    console.log(new_output)
    Output.create(new_output)
        .then((data) => {
            response.success(res, { outputs: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.get('/output/:date', (req, res) => {
    Output.list(req.params.date)
        .then((data) => {
            response.success(res, { outputs: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.get('/date', (req, res) => {
    Output.listAll()
        .then((data) => {
            response.success(res, { outputs: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
})
module.exports = app;