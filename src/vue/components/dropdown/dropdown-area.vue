<template>
	<dropdown :is-list="isList">
		<a href="#" @click.prevent :class="btnClass">
			<i class="dropdown-menu-icon" v-if="icon" :class="icon"></i>
			<span>{{ label }}</span>
		</a>
		<div class="dropdown-menu" @click.stop>
			<slot></slot>
		</div>
	</dropdown>
</template>

<script>
	import Dropdown from './dropdown.vue'

	export default {
		props: {
			label: {
				type: String,
				required: true
			},
			icon: {
				type: String
			},
			btnClass: {
				type: String
			},
			isList: {
				type: Boolean,
				default: true
			}
		},
		components: {
			Dropdown
		}
	}
</script>

<style lang="sass">
	@import "~themekit-vue/src/sass/dropdown/dropdown-menu";
</style>