<template>
	<h4 class="sidebar-category" v-if="heading">{{ heading }}</h4>
	<ul class="sidebar-menu" :class="menuClasses">
		<slot></slot>
	</ul>
</template>
<script>
	export default {
		props: {
			icons: {
				type: String
			},
			menu: {
				type: String
			},
			heading: {
				type: String
			}
		},
		computed: {
			menuClasses () {
				var obj = {}
				if (this.menu) {
					this.menu.split(' ').forEach(function (className) {
						obj['sidebar-menu-' + className] = true
					})
				}
				if (this.icons) {
					this.icons.split(' ').forEach(function (icon) {
						obj['sidebar-menu-icons-' + icon] = true
					})
				}
				return obj
			}
		}
	}
</script>

<style lang="less">
    @import "~themekit-less/src/sidebar-menu/sidebar-menu";
    @import "~themekit-less/src/sidebar-menu/sidebar-dropdown";
</style>