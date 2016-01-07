var extend = require('themekit-webpack-config/extend')
var base = require('./webpack.config.js')
var dev = require('themekit-webpack-config/dev')
module.exports = extend(base, dev)