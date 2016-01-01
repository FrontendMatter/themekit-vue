var extend = require('themekit-webpack-config/extend');
var base = require('themekit-webpack-config/base');
var path = require('path');
var webpack = require('webpack');

// change dist/build to dist
delete base.output.publicPath

// remove CommonsChunkPlugin
base.plugins = base.plugins.filter(function (plugin) {
	return plugin instanceof webpack.optimize.CommonsChunkPlugin === false
})

// for some reason, without exclude, the build loaded in the browser throws errors
base.module.loaders.map(function(loader, index) {
	if (String(loader.test) === String(/\.js$/)) {
		loader.exclude = /node_modules|bower_components/
	}
})

module.exports = extend(base, {
	entry: {
		themekit: [ './src/index.js' ]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
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
		}
	]
})