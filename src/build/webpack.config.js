var extend = require('themekit-webpack-config/extend')
var base = require('themekit-webpack-config/base')

module.exports = extend(base.getConfig(), {
	entry: {
		themekit: [ base.srcPath('index.js') ]
	},
	output: {
		library: 'ThemeKit',
		libraryTarget: 'umd'
	},
	externals: [
		{
			'jquery': 'jQuery'
		},
		{
			'isotope-layout': 'Isotope',
			'isotope-packery': {
				root: 'Packery',
				commonjs: 'isotope-packery',
				commonjs2: 'isotope-packery',
				amd: 'isotope-packery'
			}
		},
		'bootstrap-datepicker'
	]
})