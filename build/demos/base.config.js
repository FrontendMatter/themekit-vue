module.exports = {
	srcPath: 'demos/src',
	distPath: 'demos/dist',
	loader: {
		babel: {
			exclude: [
				/node_modules/,
				/bower_components/
			],
			include: [
				/demos\/src/
			]
		}
	}
}