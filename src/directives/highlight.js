import highlight from 'highlight.js/lib/highlight'
import langXml from 'highlight.js/lib/languages/xml'
import langJavaScript from 'highlight.js/lib/languages/javascript'
import beautify from 'js-beautify'
import merge from 'mout/object/merge'

highlight.registerLanguage('xml', langXml)
highlight.registerLanguage('javascript', langJavaScript)

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