var config = require('./webpack.config')
module.exports = config.map(function (config, index) {
	return config.dev().getConfig()
})