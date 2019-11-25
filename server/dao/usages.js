var Usage = require('../models/Usage');

Usage.list = () => {
  return new Promise((resolve, reject) => {
    Usage.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

Usage.create = (newUsage) => {
  let usage = new Usage({...newUsage});
  return new Promise((resolve, reject) => {
    usage.save((err, usage) => {
      if (err) reject(err);
      else resolve(usage);
    });
  })
};

Usage.update = (name, newUsage) => {
  return new Promise((resolve, reject) => {
    Usage.findOne({name: name}, (err, usage) => {
      if(err) {
          reject(err);
      }
      usage.name = newUsage.name;
      usage.extru = newUsage.extru;

      usage.save((err, usage) => {
          if(err) {
              reject(err);
          } else {
              resolve(usage);
          }
      });
    });
  })
};

Usage.delete = (name) => {
  return new Promise((resolve, reject) => {
    Usage.findOneAndRemove({name: name}, (err, usage) => {
      if (err) reject(err);
      else resolve(usage);
    })
  })
};

module.exports = Usage;