var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var config = new Base()
var path = require('path')
var resolveAlias = {
	'themekit-vue': path.resolve(__dirname, '../..')
}

module.exports = extend(config.getConfig(), {
	entry: {
		themekit: [ config.srcPath('index.js') ]
	},
	output: {
		library: 'ThemeKit',
		libraryTarget: 'umd'
	},
	externals: [
		{ 'vue': 'Vue' },
		{ 'jquery': 'jQuery' },
		{
			'isotope-layout': 'Isotope',
			'isotope-packery': {
				root: 'Packery',
				commonjs: 'isotope-packery',
				commonjs2: 'isotope-packery',
				amd: 'isotope-packery'
			}
		},
		'bootstrap-datepicker',
		{ 'dropzone/dist/dropzone': 'Dropzone' },
		{ 'mprogress/build/js/mprogress': 'Mprogress' }
	],
	resolve: {
		alias: resolveAlias
	},
	resolveLoader: {
		alias: resolveAlias
	}
})