<template>
	<layout-transition>
		<sidebar-transition show slot="sidebar" size="2" effect="reveal">
			<sidebar-block heading="It works!">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi laudantium est repellat consequuntur id voluptatem, eveniet blanditiis repellendus possimus aperiam consequatur sunt atque quia, quidem ducimus sit facilis nobis voluptates.
			</sidebar-block>
		</sidebar-transition>
		<div class="container-fluid">

			<br>

			<div class="panel">
				<div class="panel-body">
					<sidebar-toggle-button 
						sidebar-id="sidebar" 
						label="Toggle Sidebar"
						class="btn btn-primary">
					</sidebar-toggle-button>
				</div>
			</div>
			
			<tabs>
				<tab-pane icon="fa fa-fw fa-html5" label="HTML" active>
					<pre><code v-highlight="html" lang="html"></code></pre>
				</tab-pane>
				<tab-pane label="JavaScript" icon="fa fa-fw fa-code">
					<pre><code v-highlight="javascript" lang="javascript"></code></pre>
				</tab-pane>
			</tabs>

		</div>
	</layout-transition>
</template>

<script>
import { Layout } from 'themekit-vue'
import { Sidebar } from 'themekit-vue'
import { LayoutTransition } from 'themekit-vue'
import { SidebarTransition } from 'themekit-vue'
import { SidebarBlock } from 'themekit-vue'
import { SidebarToggleButton } from 'themekit-vue'
import { Tabs } from 'themekit-vue'
import { TabPane } from 'themekit-vue'
import camelCase from 'mout/string/camelCase'

export default {
	computed: {
		sidebars () {
			return this.$children[0].queue
		},
		sidebarsMarkup () {
			let html = ''
			let propsCast = ['show', 'mini', 'reveal']
			let props = ['sidebar-id', 'position', 'visible', 'size', 'offset']
			this.sidebars.forEach((sidebar) => {
				html += `
					<!-- Sidebar -->
					<sidebar slot="sidebar" `

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
					</sidebar>
					<!-- // END Sidebar -->
				`
			})
			return html.trim()
		},
		html () {
			return `
				<!-- Layout -->
				<layout>

					${ this.sidebarsMarkup }

					<!-- The layout content goes here -->

				</layout>
				<!-- // END Layout -->
			`.trim()
		},
		javascript () {
			let components = [{
				name: 'Layout',
				view: 'layout/layout'
			}]
			if (this.sidebars.length) {
				components.push({
					name: 'Sidebar',
					view: 'sidebar/sidebar'
				})
			}
			let html = '/* Import component(s) */'
			let names = []
			components.forEach((component) => {
				html += `
					import ${ component.name } from 'themekit-vue/src/vue/components/${ component.view }.vue'`
				names.push(component.name)
			})
			html += `

				/* Create a Vue instance */
				new Vue({
					el: 'body',
					replace: false,
					components: {
						${ names.join(',\n') }
					}
				})
			`
			return html.trim()
		}
	},
	components: {
		Layout,
		Sidebar,
		LayoutTransition,
		SidebarTransition,
		SidebarBlock,
		SidebarToggleButton,
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