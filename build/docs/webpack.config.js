var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var config = new Base()
var main = require('../src/webpack.config')

module.exports = extend(config.getConfig(), {
	entry: {
		docs: config.srcPath('index.js'),
		util: config.srcPath('util.js')
	},
	output: {
		library: 'Docs',
		libraryTarget: 'umd'
	},
	externals: main.externals,
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