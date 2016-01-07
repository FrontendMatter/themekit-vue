module.exports = {
	publicPath: false,
	outputPath: false,
	plugins: {
		CommonsChunkPlugin: false
	},
	loader: {
		babel: {
			exclude: [
				/node_modules/,
				/bower_components/
			]
		}
	}
}