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
			{ 'jquery': 'jQuery' },
			{
				'isotope-layout': {
					root: 'Isotope',
					commonjs: 'isotope-layout',
					commonjs2: 'isotope-layout',
					amd: 'isotope-layout'
				},
				'isotope-packery': {
					root: 'Packery',
					commonjs: 'isotope-packery',
					commonjs2: 'isotope-packery',
					amd: 'isotope-packery'
				}
			},
			{ 'dropzone/dist/dropzone': 'Dropzone' },
			{ 'mprogress/build/js/mprogress': 'Mprogress' },
			'bootstrap-datepicker',
			'load_image/load_image',
			'jquery.breakpoints/breakpoints',
			'simplebar/src/simplebar',
			'highlight.js/lib/highlight',
			'highlight.js/lib/languages/xml',
			'highlight.js/lib/languages/javascript',
			'js-beautify'
		]
	})
	.use('extract')

module.exports = config