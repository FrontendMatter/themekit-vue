<template>

	<!-- Navbar -->
	<slot name="navbar"></slot>

	<!-- Sidebars -->
	<slot name="sidebar"></slot>

	<!-- Content -->
	<div class="layout-content">
		<slot></slot>
	</div>

</template>

<script>
	export default {
		data () {
			return {
				queue: []
			}
		},
		methods: {
			onToggleSidebar (sidebarId) {
				clearInterval(this.toggleInterval)
				this.toggleInterval = setInterval(function () {
					var visible = this.queue.filter(function (sidebar) {
						return sidebar.sidebarId !== sidebarId
					})
					.filter(function (sidebar) {
						return sidebar.isVisible
					})
					if (!visible.length) {
						this.toggleSidebar(sidebarId)
						clearInterval(this.toggleInterval)
					}
				}.bind(this), 100)
				this.queue.filter(function (sidebar) {
					return sidebar.sidebarId !== sidebarId
				})
				.forEach(function (sidebar) {
					sidebar.show = false
				})
			},
			toggleSidebar (sidebarId) {
				this.queue.filter((s) => sidebarId === s.sidebarId).forEach(function (sidebar) {
					sidebar.show = !sidebar.show
				}, this)
			},
			registerSidebar (sidebar) {
				this.queue.push(sidebar)
			},
			unregisterSidebar (sidebar) {
				this.queue = this.queue.filter((s) => s.sidebarId !== sidebar.sidebarId)
			},
			hasNavbar () {
				return document.querySelector('[slot="navbar"]')
			}
		},
		beforeDestroy () {
			clearInterval(this.toggleInterval)
			this.$root.$off('toggle.tk.sidebar', this.onToggleSidebar)
		},
		ready () {
			this.$root.$broadcast('context.tk.layout', this)
			this.$root.$on('toggle.tk.sidebar', this.onToggleSidebar)
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/layout/app";
	@import "~themekit-less/src/layout/content";
	@import "~themekit-less/src/layout/footer";
	@import "~themekit-less/src/layout/grid";
	@import "~themekit-less/src/layout/split";
	@import "~themekit-less/src/layout/scrollable";
</style>