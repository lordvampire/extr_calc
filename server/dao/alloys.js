var Alloys = require('../models/Alloys');

Alloys.list = () => {
  return new Promise((resolve, reject) => {
    Alloys.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

module.exports = Alloys;