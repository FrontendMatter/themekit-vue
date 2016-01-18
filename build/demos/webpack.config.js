var main = require('../src/webpack.config')
var WebpackConfig = require('themekit-webpack-config')
var commonOptions = {
	distPath: 'demos/dist'
}
var commonWebpack = {
	resolve: main.instOptions.webpack.resolve,
	resolveLoader: main.instOptions.webpack.resolveLoader,
	sassImportLoader: main.instOptions.webpack.sassImportLoader
}

var demo = new WebpackConfig(commonOptions)
	.options({ srcPath: 'demos/src' })
	.webpack(commonWebpack)
	.withEntry('demo.js')
	.withEntry('vendor.js')
	.use('bower')
	.use('extract')
	.use('vendor')
	.use('commons')

var util = new WebpackConfig(commonOptions)
	.options({ srcPath: 'demos/src/util' })
	.webpack(commonWebpack)
	.webpack({
		externals: main.instOptions.webpack.externals
	})
	.withLibrary('Util')
	.withEntry('util')
	.use('extract')

module.exports = [demo, util]