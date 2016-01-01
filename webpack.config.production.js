var extend = require('themekit-webpack-config/extend');
var base = require('./webpack.config.js');
var production = require('themekit-webpack-config/production');
module.exports = extend(base, production);