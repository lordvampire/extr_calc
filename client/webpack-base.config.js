const _ = require('lodash');

const sharedConfigs = {
  context: __dirname,
  entry: {
    app: './src/js/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react', 
              '@babel/preset-env',
              {
                "plugins": [
                  "@babel/plugin-proposal-class-properties"
                ]
              }
            ]
          }
        }
      }
    ]
  }
};

const mergeResolver = (objValue, srcValue) => (
  _.isArray(objValue) ? objValue.concat(srcValue) : undefined
);

module.exports = configs => _.mergeWith(sharedConfigs, configs, mergeResolver);
