var Complexity = require('../models/Complexities');

Complexity.list = () => {
  return new Promise((resolve, reject) => {
    Complexity.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

Complexity.create = (newComplexity) => {
  let complexity = new Complexity({...newComplexity});
  return new Promise((resolve, reject) => {
    complexity.save((err, complexity) => {
      if (err) reject(err);
      else resolve(complexity);
    });
  })
};

Complexity.update = (name, newComplexity) => {
  return new Promise((resolve, reject) => {
    Complexity.findOne({name: name}, (err, complexity) => {
      if(err) {
          reject(err);
      }
      complexity.name = newComplexity.name;
      complexity.extru = newComplexity.extru;

      complexity.save((err, complexity) => {
          if(err) {
              reject(err);
          } else {
              resolve(complexity);
          }
      });
    });
  })
};

Complexity.delete = (name) => {
  return new Promise((resolve, reject) => {
    Complexity.findOneAndRemove({name: name}, (err, complexity) => {
      if (err) reject(err);
      else resolve(complexity);
    })
  })
};

module.exports = Complexity;