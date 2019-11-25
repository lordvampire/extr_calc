var ProfileType = require('../models/ProfileType');

ProfileType.list = () => {
  return new Promise((resolve, reject) => {
    ProfileType.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

module.exports = ProfileType;