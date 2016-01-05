import highlight from 'highlight.js/lib/highlight'
import 'highlight.js/styles/github-gist'
import langXml from 'highlight.js/lib/languages/xml'
import langJavaScript from 'highlight.js/lib/languages/javascript'
import { html as beautifyHTML, js as beautifyJS } from 'js-beautify'
import merge from 'mout/object/merge'

highlight.registerLanguage('xml', langXml)
highlight.registerLanguage('javascript', langJavaScript)

export default {
	params: ['lang'],
	beautify (value, options) {
		if (this.params.lang === 'html') {
			return beautifyHTML(value, merge({
				max_preserve_newlines: 1
			}, options))
		}
		if (this.params.lang === 'javascript') {
			return beautifyJS(value, merge({
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
			this.el.innerText = this.params.lang ? this.beautify(value, {
				wrap_attributes: 'force'
			}) : value
		}
		highlight.highlightBlock(this.el)
	}
}