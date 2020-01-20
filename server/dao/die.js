var Die = require('../models/Die');

Die.list = () => {
  return new Promise((resolve, reject) => {
    Die.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

Die.create = (newDie) => {
  let die = new Die({...newDie});

  return new Promise((resolve, reject) => {
    die.save((err, die) => {
      if (err) {
        console.log(err)
        reject(err);
      }
      else resolve(die);
    });
  })
};

Die.update = (name, newDie) => {
  return new Promise((resolve, reject) => {
    Die.findOne({name: name}, (err, die) => {
      if(err) {
          reject(err);
      }

      die = JSON.parse(JSON.stringify(newDie));

      die.save((err, die) => {
          if(err) {
              reject(err);
          } else {
              resolve(die);
          }
      });
    });
  })
};

Die.delete = (name) => {
  return new Promise((resolve, reject) => {
    Die.findOneAndRemove({name: name}, (err, die) => {
      if (err) reject(err);
      else resolve(die);
    })
  })
};

module.exports = Die;