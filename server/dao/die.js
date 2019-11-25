var TableDie = require('../models/Die');

TableDie.list = () => {
  return new Promise((resolve, reject) => {
    TableDie.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

module.exports = TableDie;