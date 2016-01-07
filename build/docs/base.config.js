module.exports = {
	publicPath: false,
	outputPath: false,
	srcPath: 'docs',
	plugins: {
		CommonsChunkPlugin: false
	},
	loader: {
		babel: {
			exclude: [
				/node_modules/,
				/bower_components/
			],
			include: [
				/docs/
			]
		}
	}
}