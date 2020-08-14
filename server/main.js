const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

var cors = require('./middleware/cors');

var v1 = require('./routes/v1');

dotenv.config();
const app = express();
const basePort = 3000;

const setMiddleware = () => {
  app.use(cors('*'));
  app.use(bodyParser.json());

  app.use(`/calculator/v1`, v1);
}

const connectMongoDB = () => {
  const conUrl = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-uve1d.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
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

startServer(process.env.SERVER_PORT || basePort);
