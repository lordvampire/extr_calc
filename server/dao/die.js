var TableDies = require('../models/Dies');

TableDies.list = () => {
  return new Promise((resolve, reject) => {
    TableDies.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

module.exports = TableDies;