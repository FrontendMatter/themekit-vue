<template>
	<div class="container-fluid">
		<h1>Dropdowns</h1>
		<dropdown-area label="Dropdown" 
		btn-class="btn btn-default"
		class="dropdown">

		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda eligendi possimus placeat fugiat quia provident culpa illo quos natus.</p>
		</dropdown-area>

		<hr>
		<dropdown-area label="Settings" 
		icon="fa fa-fw fa-cog" 
		btn-class="btn btn-primary"
		class="dropdown">
			<dropdown-menu 
				v-for="menu in menus"
				:model="menu">
			</dropdown-menu>
		</dropdown-area>
			
	</div>
</template>

<script>
	import { Dropdown } from 'themekit-vue'
	import { DropdownArea } from 'themekit-vue'
	import { DropdownMenu } from 'themekit-vue'
	
	export default {
		data () {
			return {
				menus: [
					{ label: 'Dashboard', icon: 'fa fa-home' },
					{ label: 'Email', icon: 'fa fa-envelope' },
					{ label: 'Slack', icon: 'fa fa-group' },
					{ label: 'Chat', icon: 'fa fa-comments' },
					{ label: 'Todo', icon: 'fa fa-list' },
					{ label: 'Notes', icon: 'fa fa-pencil' },
					{ label: 'Charts', icon: 'fa fa-bar-chart-o' }
				]
			}
		},
		components: {
			Dropdown,
			DropdownArea,
			DropdownMenu
		}
	}
</script>
