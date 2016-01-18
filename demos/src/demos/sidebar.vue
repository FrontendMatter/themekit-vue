<template>
	
	<!-- Layout -->
	<layout>
	
		<!-- Sidebar -->
		<sidebar 
			slot="sidebar" 
			:size.sync="props.size"
			:position.sync="props.position">
			<h4 class="sidebar-category">It works!</h4>
			<p class="sidebar-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi laudantium est repellat consequuntur id voluptatem, eveniet blanditiis repellendus possimus aperiam consequatur sunt atque quia, quidem ducimus sit facilis nobis voluptates.</p>
		</sidebar>
		<!-- // END Sidebar -->

		<!-- Content -->
		<div class="container-fluid">
			<div class="panel">
				<div class="panel-body">

					<dropdown-area label="Settings" 
						icon="fa fa-fw fa-cog" 
						btn-class="btn btn-link"
						class="dropdown-settings">
						
						<div class="panel panel-body">
							<sidebar-settings :model.sync="props"></sidebar-settings>
						</div>
					</dropdown-area>

					<hr>

					<!-- Sidebar Toggle Button -->
					<sidebar-toggle-button 
						sidebar-id="sidebar" 
						label="Toggle Sidebar"
						class="btn btn-primary">
					</sidebar-toggle-button>
				</div>
			</div>

			<!-- Usage -->
			<sidebar-usage :model.sync="usage"></sidebar-usage>
		</div>
		<!-- // END Content -->

	</layout>
	<!-- // END Layout -->

</template>

<script>
	import { Layout } from 'themekit-vue'
	import { Sidebar } from 'themekit-vue'
	import { SidebarToggleButton } from 'themekit-vue'
	import { DropdownArea } from 'themekit-vue'
	const { SidebarUsage, SidebarSettings } = window.Util

	export default {
		data () {
			return {
				usage: {
					filter: ['sidebar']
				},
				props: {}
			}
		},
		components: {
			Layout,
			Sidebar,
			SidebarToggleButton,
			DropdownArea,
			SidebarUsage,
			SidebarSettings
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