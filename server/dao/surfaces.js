var Surfaces = require('../models/Alloys');

Surfaces.list = () => {
  return new Promise((resolve, reject) => {
    Surfaces.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

module.exports = Surfaces;