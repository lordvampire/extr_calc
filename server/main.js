var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var mongoose = require('mongoose');
var cors = require('./middleware/cors');

var v1 = require('./routes/v1');

const app = express();
const basePort = 5000;

const setMiddleware = () => {
  app.use(cors('*'));
  app.use(bodyParser.json());

  app.use(`/calculator/v1`, v1);
}

const connectMongoDB = () => {
  const conUrl = "mongodb+srv://zeng:google1987211@cluster0-uve1d.mongodb.net/ExtrCalc?retryWrites=true&w=majority";
  mongoose.connect(conUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (mongooseError) {
    if (mongooseError) {
      console.log(mongooseError);
      return;
    }
    console.log(`> MongoDB connected at ${conUrl}`);
    setMiddleware();
  });
};

const startServer = (basePort) => {
  connectMongoDB();

  return new Promise((resolve, reject) => {
    let server = app.listen(basePort, (err) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      const uri = `http://localhost:${basePort}`;
      console.log(`> Listening at ${uri}\n`);
      resolve(server);
    });
  });
};

startServer(basePort);