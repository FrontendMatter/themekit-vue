<script>
	import camelCase from 'mout/string/camelCase'
	import pascalCase from 'mout/string/pascalCase'

	function unindent (str) {
		var match = str.match(/^[ \t]*(?=\S)/gm)
		if (!match) {
			return str
		}
		var indent = Math.min.apply(Math, match.map(function (el) {
			return el.length
		}))
		var re = new RegExp('^[ \\t]{' + indent + '}', 'gm')
		return indent > 0 ? str.replace(re, '') : str
	}

	export default {
		data () {
			return {
				sidebarUsage: {
					filter: []
				}
			}
		},
		computed: {
			sidebarUsage_layout () {
				return this.$children[0]
			},
			sidebarUsage_sidebars () {
				return this.sidebarUsage_layout.queue.filter((sidebar) => {
					return this.sidebarUsage.filter.indexOf(sidebar.sidebarId) !== -1
				})
			},
			sidebarUsage_sidebarsMarkup () {
				let html = ''
				let propsCast = ['show', 'mini', 'reveal']
				let props = ['sidebar-id', 'position', 'visible', 'size', 'offset']
				this.sidebarUsage_sidebars.forEach((sidebar) => {
					html += `
						<!-- Sidebar -->
						<${ sidebar.$options.name } slot="${ sidebar.$el.getAttribute('slot') }" `

					propsCast.forEach((p) => {
						let value = sidebar[camelCase(p)]
						if (value) {
							html += `
								:${ p }="${ value }"`
						}
					})
					props.forEach((p) => {
						let value = sidebar[camelCase(p)]
						if (value) {
							html += `
								${ p }="${ sidebar[camelCase(p)] }"`
						}
					})
					html += `>
						</${ sidebar.$options.name }>
						<!-- // END Sidebar -->
					`
				})
				return html.trim()
			},
			sidebarUsage_html () {
				return `
					<!-- Layout -->
					<${ this.sidebarUsage_layout.$options.name }>

						${ this.sidebarUsage_sidebarsMarkup }

						<!-- The layout content goes here -->

					</${ this.sidebarUsage_layout.$options.name }>
					<!-- // END Layout -->
				`.trim()
			},
			sidebarUsage_javascript_import () {
				let html = '/* Import component(s) */'
				this.sidebarUsage_components.forEach((component) => {
					html += unindent(`
						import { ${ component } } from 'themekit-vue'`)
				})
				return html.trim()
			},
			sidebarUsage_javascript_vm_es6 () {
				return `

					/* Create a Vue instance */
					new Vue({
						el: 'body',
						replace: false,
						components: {
							${ this.sidebarUsage_components.join(',\n') }
						}
					})
				`
				.trim()
			},
			sidebarUsage_javascript_require () {
				let html = '/* Require component(s) */'
				this.sidebarUsage_components.forEach((component) => {
					html += `
						var ${ component } = require('themekit-vue').${ component };`
				})
				return html.trim()
			},
			sidebarUsage_javascript_vm_commonjs () {
				return `

					/* Create a Vue instance */
					new Vue({
						el: 'body',
						replace: false,
						components: {
							${ this.sidebarUsage_components.map((component) => {
								return `${ camelCase(component) }: ${ component }`
							}).join(',\n') }
						}
					})
				`
				.trim()
			},
			sidebarUsage_javascript_static () {
				return `
					<!-- Load Dependencies -->
					<!-- ... -->

					<!-- Load ThemeKit -->
					<script src="dist/themekit.js"><\/script>
				`
				.trim()
			},
			sidebarUsage_javascript_vm_static () {
				return `

					<!-- Create a Vue instance -->
					<script>
						new Vue({
							el: 'body',
							replace: false,
							components: {
								${ this.sidebarUsage_components.map((component) => {
									return `${ camelCase(component) }: ThemeKit.${ component }`
								}).join(',\n') }
							}
						});
					<\/script>
				`
				.trim()
			},
			sidebarUsage_components () {
				let components = [this.sidebarUsage_componentName(this.sidebarUsage_layout)]
				this.sidebarUsage_sidebars.forEach((sidebar) => {
					let sidebarName = this.sidebarUsage_componentName(sidebar)
					if (components.indexOf(sidebarName) === -1) {
						components.push(sidebarName)
					}
				})
				return components
			}
		},
		methods: {
			sidebarUsage_componentName (component) {
				let id = component.$options.name
				return pascalCase(id)
			}
		}
	}
</script>