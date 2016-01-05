<template>

	<layout-transition>
		
		<!-- Sidebar -->
		<sidebar-transition
			v-for="effect in effects.withPush"
			:show="effect === 'push'"
			slot="sidebar-push"
			:position="sidebarProps.position"
			:sidebar-id="'sidebar-' + effect"
			:size.sync="sidebarProps.size"
			:mini.sync="sidebarProps.mini"
			:effect="effect">

			<h4 class="sidebar-category">Testing</h4>
			<p class="sidebar-text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
			</p>
		</sidebar-transition>

		<!-- Sidebar -->
		<sidebar-transition
			v-for="effect in effects.withoutPush"
			slot="sidebar"
			:position="sidebarProps.position"
			:sidebar-id="'sidebar-' + effect"
			:size.sync="sidebarProps.size"
			:mini.sync="sidebarProps.mini"
			:effect="effect">

			<h4 class="sidebar-category">Testing</h4>
			<p class="sidebar-text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
			</p>
		</sidebar-transition>

		<!-- Sidebar -->
		<sidebar
			slot="sidebar"
			position="left"
			sidebar-id="sidebar-no-st-left"
			:mini.sync="sidebarProps.mini"
			:size.sync="sidebarProps.size">

			<h4 class="sidebar-category">Testing</h4>
			<p class="sidebar-text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
			</p>
		</sidebar>

		<!-- Sidebar -->
		<sidebar
			slot="sidebar"
			position="right"
			sidebar-id="sidebar-no-st-right"
			:mini.sync="sidebarProps.mini"
			:size.sync="sidebarProps.size">

			<h4 class="sidebar-category">Testing</h4>
			<p class="sidebar-text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
			</p>
		</sidebar>

		<div class="container-fluid">

			<div style="margin: 20px 0;">

				<div class="row">
					<div class="col-md-3">
						<label>Position:</label>
						<div class="form-inline">
							<div class="radio">
								<label for="position-left">
									<input id="position-left" type="radio" value="left" v-model="sidebarProps.position" /> Left
								</label>
							</div>
							&nbsp;
							<div class="radio">
								<label for="position-right">
									<input id="position-right" type="radio" value="right" v-model="sidebarProps.position" /> Right
								</label>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<label>Size:</label>
						<div class="form-inline">
							<div class="radio">
								<label for="sc-size-1">
									<input id="sc-size-1" type="radio" value="1" v-model="sidebarProps.size" /> 56px
								</label>
							</div>
							&nbsp;
							<div class="radio">
								<label for="sc-size-2">
									<input id="sc-size-2" type="radio" value="2" v-model="sidebarProps.size" /> 200px
								</label>
							</div>
							&nbsp;
							<div class="radio">
								<label for="sc-size-3">
									<input id="sc-size-3" type="radio" value="3" v-model="sidebarProps.size" /> 250px
								</label>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<label>Mini:</label>
						<div class="form-inline">
							<div class="checkbox">
								<label for="sc-mini">
									<input id="sc-mini" type="checkbox" value="left" v-model="sidebarProps.mini" /> Yes
								</label>
							</div>
						</div>
					</div>
				</div>

				<hr>
				
				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button
					v-for="effect in effects.withPush" 
					:sidebar-id="'sidebar-' + effect" 
					:label="effect"
					class="btn btn-default">
				</sidebar-toggle-button>

				<hr>

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button
					v-for="effect in effects.withoutPush" 
					:sidebar-id="'sidebar-' + effect" 
					:label="effect"
					class="btn btn-default">
				</sidebar-toggle-button>

				<hr>

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button 
					sidebar-id="sidebar-no-st-left" 
					label="Left NST" 
					class="btn btn-primary">
				</sidebar-toggle-button>

				<!-- Sidebar Toggle Button -->
				<sidebar-toggle-button 
					sidebar-id="sidebar-no-st-right" 
					label="Right NST" 
					class="btn btn-primary">
				</sidebar-toggle-button>

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

	</layout-transition>

</template>

<script>
	import { LayoutTransition } from 'themekit-vue'
	import { SidebarTransition } from 'themekit-vue'
	import { Sidebar } from 'themekit-vue'
	import { SidebarToggleButton } from 'themekit-vue'
	import { Tabs } from 'themekit-vue'
	import { TabPane } from 'themekit-vue'
	import SidebarUsage from '../docs/sidebar-usage'

	export default {
		mixins: [ SidebarUsage ],
		data () {
			return {
				effects: {
					withPush: [
						'push',
						'push-3d-rotate-in',
						'push-3d-rotate-out',
						'push-3d-rotate-delay'
					],
					withoutPush: [
						'reveal',
						'slide-in',
						'slide-along',
						'slide-out-reverse',
						'scale-up',
						'fall-down'
					]
				},
				sidebarProps: {
					position: 'left',
					size: '2',
					mini: false
				}
			}
		},
		methods: {
			showSidebarUsage (sidebar) {
				this.sidebarUsage.filter = [sidebar.sidebarId]
			}
		},
		beforeDestroy () {
			this.sidebarUsage_layout.$off('show.tk.sidebar', this.showSidebarUsage)
		},
		ready () {
			this.sidebarUsage_layout.$on('show.tk.sidebar', this.showSidebarUsage)
		},
		components: {
			LayoutTransition,
			SidebarTransition,
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
	.panel-default {
		background: #f9f9f9;
		border-color: #f9f9f9;
	}
	.btn {
		margin: 5px;
	}
	hr {
		margin: 10px 0;
	}
</style>