<template>
	<dropdown-list-item :class="class">
		<partial name="toggle"></partial>
		<ul class="dropdown-menu" :class="dropdownMenuClass" @click.stop>
			<partial name="dropdown-menu-content"></partial>
		</ul>
	</dropdown-list-item>
</template>

<script>
	import DropdownArea from './dropdown-area'
	import DropdownListItem from './dropdown-list-item'

	export default {
		mixins: [
			DropdownArea
		],
		components: {
			DropdownListItem
		}
	}
</script>