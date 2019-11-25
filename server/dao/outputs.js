var Output = require('../models/Output');

Output.create = (newOutput) => {
  
  let output = new Output({...newOutput});

  return new Promise((resolve, reject) => {
    output.save((err, output) => {
      if (err) {
        console.log(err)
        reject(err);
      }
      else resolve(output);
    });
  })
};

Output.list = (date) => {
  return new Promise((resolve, reject) => {
    Output.find({timestamp: date}, (err, output) => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
};

Output.listAll = () => {
  return new Promise((resolve, reject) => {
    Output.aggregate([
      {
        $group: {
          _id: '$timestamp',
          count: { $sum:1 }
        }
      }
    ], (err, output) => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    })
  });
};

module.exports = Output;