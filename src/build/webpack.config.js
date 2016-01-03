var extend = require('themekit-webpack-config/extend')
var Base = require('themekit-webpack-config/base')
var config = new Base()

module.exports = extend(config.getConfig(), {
	entry: {
		themekit: [ config.srcPath('index.js') ]
	},
	output: {
		library: 'ThemeKit',
		libraryTarget: 'umd'
	},
	externals: [
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
		{ 'dropzone/dist/dropzone': 'Dropzone' }
	]
})