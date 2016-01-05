<template>
	
	<!-- Layout -->
	<layout>
	
		<!-- Sidebar -->
		<sidebar slot="sidebar" size="2">
			<h4 class="sidebar-category">It works!</h4>
			<p class="sidebar-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi laudantium est repellat consequuntur id voluptatem, eveniet blanditiis repellendus possimus aperiam consequatur sunt atque quia, quidem ducimus sit facilis nobis voluptates.</p>
		</sidebar>
		<!-- // END Sidebar -->

		<!-- Content -->
		<div class="container-fluid">
			<div class="panel">
				<div class="panel-body">

					<!-- Sidebar Toggle Button -->
					<sidebar-toggle-button 
						sidebar-id="sidebar" 
						label="Toggle Sidebar"
						class="btn btn-primary">
					</sidebar-toggle-button>
				</div>
			</div>
			<tabs>
				<tab-pane icon="fa fa-fw fa-html5" label="Template" active>
					<pre><code v-highlight="sidebarUsage_html" lang="html"></code></pre>
				</tab-pane>
				<tab-pane label="Script" icon="fa fa-fw fa-code">
					<h3>ES6</h3>
					<pre><code v-highlight="sidebarUsage_javascript_import"></code></pre>
					<pre><code v-highlight="sidebarUsage_javascript_vm_es6" lang="javascript"></code></pre>

					<h3>CommonJS</h3>
					<pre><code v-highlight="sidebarUsage_javascript_require" lang="javascript"></code></pre>
					<pre><code v-highlight="sidebarUsage_javascript_vm_commonjs" lang="javascript"></code></pre>

					<h3>Static</h3>
					<pre><code v-highlight="sidebarUsage_javascript_static" lang="html"></code></pre>
					<pre><code v-highlight="sidebarUsage_javascript_vm_static" lang="html"></code></pre>
				</tab-pane>
			</tabs>
		</div>
		<!-- // END Content -->

	</layout>
	<!-- // END Layout -->

</template>

<script>
	import { Layout } from 'themekit-vue'
	import { Sidebar } from 'themekit-vue'
	import { SidebarToggleButton } from 'themekit-vue'
	import { Tabs } from 'themekit-vue'
	import { TabPane } from 'themekit-vue'
	import SidebarUsage from '../docs/sidebar-usage'

	export default {
		mixins: [ SidebarUsage ],
		ready () {
			this.sidebarUsage.filter = ['sidebar']
		},
		components: {
			Layout,
			Sidebar,
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