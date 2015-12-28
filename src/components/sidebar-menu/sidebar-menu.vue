<template>
	<h4 class="sidebar-category" v-if="heading">{{ heading }}</h4>
	<ul class="sidebar-menu" :class="class">
		<slot></slot>
	</ul>
</template>
<script>
	export default {
		props: {
			icons: {
				type: String
			},
			heading: {
				type: String
			},
			class: {
				type: Object
			}
		}
	}
</script>

<style lang="sass">
    @import "~themekit-sass/src/sidebar-menu/sidebar-menu";
    @import "~themekit-sass/src/sidebar-menu/utils";
</style>