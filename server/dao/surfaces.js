var Surface = require('../models/Surface');

Surface.list = () => {
  return new Promise((resolve, reject) => {
    Surface.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

Surface.create = (newSurface) => {
  let surface = new Surface({...newSurface});
  return new Promise((resolve, reject) => {
    surface.save((err, surface) => {
      if (err) reject(err);
      else resolve(surface);
    });
  })
};

Surface.update = (name, newSurface) => {
  return new Promise((resolve, reject) => {
    Surface.findOne({name: name}, (err, surface) => {
      if(err) {
          reject(err);
      }
      surface.name = newSurface.name;
      surface.extru = newSurface.extru;

      surface.save((err, surface) => {
          if(err) {
              reject(err);
          } else {
              resolve(surface);
          }
      });
    });
  })
};

Surface.delete = (name) => {
  return new Promise((resolve, reject) => {
    Surface.findOneAndRemove({name: name}, (err, surface) => {
      if (err) reject(err);
      else resolve(surface);
    })
  })
};

module.exports = Surface;