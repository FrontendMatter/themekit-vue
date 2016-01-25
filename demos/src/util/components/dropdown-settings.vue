<template>
	<dropdown-area label="Settings" 
		icon="fa fa-fw fa-cog" 
		btn-class="btn btn-link"
		class="dropdown-settings">
		
		<div class="panel panel-body">
			<slot></slot>
		</div>
	</dropdown-area>
</template>

<script>
	import { DropdownArea } from 'themekit-vue'
	export default {
		components: {
			DropdownArea
		}
	}
</script>

<style>
	.dropdown-settings {
		display: block !important;
		margin-top:10px;
	}
	.dropdown-settings .dropdown-menu {
		width: 100%;
		border:1px solid #efefef;
	}
	.dropdown-settings .panel {
		margin: 0;
		border: none;
	}
</style>