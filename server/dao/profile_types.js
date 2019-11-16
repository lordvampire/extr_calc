var ProfileTypes = require('../models/ProfileTypes');

ProfileTypes.list = () => {
  return new Promise((resolve, reject) => {
    ProfileTypes.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

module.exports = ProfileTypes;