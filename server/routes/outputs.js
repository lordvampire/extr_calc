var express = require('express');
var Output = require('../dao/outputs');
var response = require('../util/response');

const app = express();

app.post('/', (req, res) => {
    let new_output = req.body;

    Output.create(new_output)
        .then((data) => {
            response.success(res, { outputs: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});

app.get('/output/:date', (req, res) => {
    console.log("datae", req.params.date);
    Output.list(req.params.date)
        .then((data) => {
            response.success(res, { outputs: data });
        })
        .catch(err => {
            response.failure(res, err);
        });
});
module.exports = app;