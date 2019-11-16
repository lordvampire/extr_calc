var Complexities = require('../models/Complexities');

Complexities.list = () => {
  return new Promise((resolve, reject) => {
    Complexities.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

module.exports = Complexities;