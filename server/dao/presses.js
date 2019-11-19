var Press = require('../models/Presses');

Press.list = () => {
  return new Promise((resolve, reject) => {
    Press.find((err, types) => {
      if (err) {
        reject(err);
      } else {
        resolve(types);
      }
    });
  });
};

Press.create = (newPress) => {
  let press = new Press({...newPress});

  return new Promise((resolve, reject) => {
    press.save((err, press) => {
      if (err) {
        console.log(err)
        reject(err);
      }
      else resolve(press);
    });
  })
};

Press.update = (name, newPress) => {
  return new Promise((resolve, reject) => {
    Press.findOne({name: name}, (err, press) => {
      if(err) {
          reject(err);
      }
      
      press.name = newPress.name;
      press.inch = newPress.inch;
      press.billet_dia = newPress.billet_dia;
      press.container_dia = newPress.container_dia;
      press.billet_length_max = newPress.billet_length_max;
      press.table_length_max = newPress.table_length_max;
      press.ram_speed_max = newPress.ram_speed_max;
      press.max_profile_width = newPress.max_profile_width;
      press.speedIST = newPress.speedIST;
      press.max_puller = newPress.max_puller;
      press.max_strangzahl = newPress.max_strangzahl;
      press.rampernverlust = newPress.rampernverlust;
      press.log_billet = newPress.log_billet;
      press.value_spreading = newPress.value_spreading;

    //   press = JSON.parse(JSON.stringify(newPress));

      press.save((err, press) => {
          if(err) {
              reject(err);
          } else {
              resolve(press);
          }
      });
    });
  })
};

Press.delete = (name) => {
  return new Promise((resolve, reject) => {
    Press.findOneAndRemove({name: name}, (err, press) => {
      if (err) reject(err);
      else resolve(press);
    })
  })
};

module.exports = Press;