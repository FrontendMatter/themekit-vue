<template>

	<layout-transition>
		
		<!-- Sidebar -->
		<sidebar-transition
			v-for="effect in effects.withPush"
			:show="effect === 'push'"
			slot="sidebar-push"
			:position="props.position"
			:sidebar-id="'sidebar-' + effect"
			:size.sync="props.size"
			:mini.sync="props.mini"
			:reveal.sync="props.reveal"
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
			:position="props.position"
			:sidebar-id="'sidebar-' + effect"
			:size.sync="props.size"
			:mini.sync="props.mini"
			:reveal.sync="props.reveal"
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
			:mini.sync="props.mini"
			:reveal.sync="props.reveal"
			:size.sync="props.size">

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
			:mini.sync="props.mini"
			:reveal.sync="props.reveal"
			:size.sync="props.size">

			<h4 class="sidebar-category">Testing</h4>
			<p class="sidebar-text">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ullam nobis accusantium dolorem quam suscipit natus illum excepturi nihil! Vel a sapiente eos vitae id, maxime odio eius eaque ipsa.
			</p>
		</sidebar>

		<div class="container-fluid">

			<div style="margin: 20px 0;">
				<dropdown-settings>	
					<sidebar-settings :model.sync="props"></sidebar-settings>
				</dropdown-settings>

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
			
			<!-- Usage -->
			<sidebar-usage :model.sync="usage"></sidebar-usage>
		</div>

	</layout-transition>

</template>

<script>
	import { LayoutTransition } from 'themekit-vue'
	import { SidebarTransition } from 'themekit-vue'
	import { Sidebar } from 'themekit-vue'
	import { SidebarToggleButton } from 'themekit-vue'
	const { SidebarUsage, SidebarSettings, DropdownSettings } = window.Util

	export default {
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
				props: {},
				usage: {}
			}
		},
		computed: {
			layout () {
				return this.$children[0]
			}
		},
		methods: {
			showSidebarUsage (sidebar) {
				this.usage.filter = [sidebar.sidebarId]
			}
		},
		beforeDestroy () {
			this.layout.$off('show.tk.sidebar', this.showSidebarUsage)
		},
		ready () {
			this.layout.$on('show.tk.sidebar', this.showSidebarUsage)
		},
		components: {
			LayoutTransition,
			SidebarTransition,
			Sidebar,
			SidebarToggleButton,
			SidebarSettings,
			SidebarUsage,
			DropdownSettings
		}
	}
</script>

<style>
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