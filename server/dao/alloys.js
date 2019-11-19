var Alloy = require('../models/Alloy');

Alloy.list = () => {
  return new Promise((resolve, reject) => {
    Alloy.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

Alloy.create = (newAlloy) => {
  let alloy = new Alloy({...newAlloy});

  return new Promise((resolve, reject) => {
    alloy.save((err, alloy) => {
      if (err) {
        console.log(err)
        reject(err);
      }
      else resolve(alloy);
    });
  })
};

Alloy.update = (name, newAlloy) => {
  return new Promise((resolve, reject) => {
    Alloy.findOne({name: name}, (err, alloy) => {
      if(err) {
          reject(err);
      }
      alloy.name = newAlloy.name;
      alloy.extru = newAlloy.extru;
      alloy.length = newAlloy.length;
      alloy.Rho = newAlloy.Rho;

      alloy.save((err, alloy) => {
          if(err) {
              reject(err);
          } else {
              resolve(alloy);
          }
      });
    });
  })
};

Alloy.delete = (name) => {
  return new Promise((resolve, reject) => {
    Alloy.findOneAndRemove({name: name}, (err, alloy) => {
      if (err) reject(err);
      else resolve(alloy);
    })
  })
};

module.exports = Alloy;