module.exports = {
	publicPath: false,
	outputPath: false,
	srcPath: 'resources/docs/src',
	distPath: 'resources/docs/dist',
	plugins: {
		CommonsChunkPlugin: false,
		ExtractTextPlugin: false
	},
	loader: {
		babel: {
			exclude: [
				/node_modules/,
				/bower_components/
			],
			include: [
				/resources\/docs\/src/
			]
		}
	}
}