<template>
	<tabs>
		<tab-pane icon="fa fa-fw fa-html5" label="Template" active>
			<pre><code v-highlight="html" lang="html"></code></pre>
		</tab-pane>
		<tab-pane label="Script" icon="fa fa-fw fa-code">
			<h3>ES6</h3>
			<pre><code v-highlight="javascript_import"></code></pre>
			<pre><code v-highlight="javascript_vm_es6" lang="javascript"></code></pre>

			<h3>CommonJS</h3>
			<pre><code v-highlight="javascript_require" lang="javascript"></code></pre>
			<pre><code v-highlight="javascript_vm_commonjs" lang="javascript"></code></pre>

			<h3>Static</h3>
			<pre><code v-highlight="javascript_static" lang="html"></code></pre>
			<pre><code v-highlight="javascript_vm_static" lang="html"></code></pre>
		</tab-pane>
	</tabs>
</template>

<script>
	import { Tabs } from 'themekit-vue'
	import { TabPane } from 'themekit-vue'
	import camelCase from 'mout/string/camelCase'
	import pascalCase from 'mout/string/pascalCase'
	import merge from 'mout/object/merge'

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
				settings: {
					filter: []
				}
			}
		},
		props: {
			model: {
				type: Object
			}
		},
		computed: {
			layout () {
				return this.$parent
			},
			sidebars () {
				return this.layout.queue.filter((sidebar) => {
					return this.model.filter.indexOf(sidebar.sidebarId) !== -1
				})
			},
			sidebarsMarkup () {
				let html = ''
				let propsCast = ['show', 'mini', 'reveal']
				let props = ['sidebar-id', 'position', 'visible', 'size', 'offset']
				this.sidebars.forEach((sidebar) => {
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
			html () {
				return `
					<!-- Layout -->
					<${ this.layout.$options.name }>

						${ this.sidebarsMarkup }

						<!-- The layout content goes here -->

					</${ this.layout.$options.name }>
					<!-- // END Layout -->
				`.trim()
			},
			javascript_import () {
				let html = '/* Import component(s) */'
				this.components.forEach((component) => {
					html += unindent(`
						import { ${ component } } from 'themekit-vue'`)
				})
				return html.trim()
			},
			javascript_vm_es6 () {
				return `

					/* Create a Vue instance */
					new Vue({
						el: 'body',
						replace: false,
						components: {
							${ this.components.join(',\n') }
						}
					})
				`
				.trim()
			},
			javascript_require () {
				let html = '/* Require component(s) */'
				this.components.forEach((component) => {
					html += `
						var ${ component } = require('themekit-vue').${ component };`
				})
				return html.trim()
			},
			javascript_vm_commonjs () {
				return `

					/* Create a Vue instance */
					new Vue({
						el: 'body',
						replace: false,
						components: {
							${ this.components.map((component) => {
								return `${ camelCase(component) }: ${ component }`
							}).join(',\n') }
						}
					})
				`
				.trim()
			},
			javascript_static () {
				return `
					<!-- Load Dependencies -->
					<!-- ... -->

					<!-- Load ThemeKit -->
					<script src="dist/themekit.js"><\/script>
				`
				.trim()
			},
			javascript_vm_static () {
				return `

					<!-- Create a Vue instance -->
					<script>
						new Vue({
							el: 'body',
							replace: false,
							components: {
								${ this.components.map((component) => {
									return `${ camelCase(component) }: ThemeKit.${ component }`
								}).join(',\n') }
							}
						});
					<\/script>
				`
				.trim()
			},
			components () {
				let components = [this.componentName(this.layout)]
				this.sidebars.forEach((sidebar) => {
					let sidebarName = this.componentName(sidebar)
					if (components.indexOf(sidebarName) === -1) {
						components.push(sidebarName)
					}
				})
				return components
			}
		},
		methods: {
			componentName (component) {
				let id = component.$options.name
				return pascalCase(id)
			}
		},
		created () {
			if (this.model) {
				this.model = merge(this.settings, this.model)
			}
		},
		components: {
			Tabs,
			TabPane
		}
	}
</script>

<style>
	pre {
		background: transparent;
		border: none;
		padding: 0;
	}
</style>