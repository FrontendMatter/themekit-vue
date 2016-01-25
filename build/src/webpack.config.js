var path = require('path')
var WebpackConfig = require('themekit-webpack-config')
var config = new WebpackConfig()
	.withStandaloneEntry('themekit')
	.withLibrary('ThemeKit')
	.withAlias({
		'themekit-vue': path.resolve(__dirname, '../..')
	})
	.webpack({
		externals: [
			{ 'jquery': 'jQuery' }
		]
	})
	.use('extract')
	.use('bower')

module.exports = config