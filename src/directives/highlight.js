// optional externals
try {
	var highlight = require('highlight.js/lib/highlight')
	let langXml = require('highlight.js/lib/languages/xml')
	let langJavaScript = require('highlight.js/lib/languages/javascript')

	highlight.registerLanguage('xml', langXml)
	highlight.registerLanguage('javascript', langJavaScript)
}
catch (e) {}
try {
	var beautify = require('js-beautify')
}
catch (e) {}

import merge from 'mout/object/merge'

export default {
	params: ['lang'],
	beautify (value, options) {
		if (typeof beautify === 'undefined' || !this.params.lang) {
			return value
		}
		if (this.params.lang === 'html') {
			return beautify.html(value, merge({
				max_preserve_newlines: 1
			}, options))
		}
		if (this.params.lang === 'javascript') {
			return beautify.js(value, merge({
				max_preserve_new_lines: 2
			}, options))
		}
		return value
	},
	bind () {
		if (this.params.lang) {
			this.el.classList.add(this.params.lang)
		}
	},
	update (value) {
		if (value) {
			this.el.innerText = this.beautify(value, {
				wrap_attributes: 'force'
			})
		}
		if (typeof highlight !== 'undefined') {
			highlight.highlightBlock(this.el)
		}
	}
}