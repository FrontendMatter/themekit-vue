var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var config = new Base()
var main = require('../src/webpack.config')

module.exports = extend(config.getConfig(), {
	entry: {
		demo: config.srcPath('demo.js'),
		vendor: config.srcPath('vendor.js')
	},
	styleImportLoader: {
		base: './src/sass/_common.scss'
	},
	resolve: {
		alias: main.resolve.alias
	},
	resolveLoader: {
		alias: main.resolveLoader.alias
	}
})