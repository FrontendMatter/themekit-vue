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
			getSidebar (sidebarId) {
				let matches = this.queue.filter((s) => s.sidebarId === sidebarId)
				return matches.length ? matches[0] : false
			},
			getSidebarsExcept (sidebarId) {
				return this.queue.filter((s) => s.sidebarId !== sidebarId)
			},
			filterVisible (sidebars) {
				return sidebars.filter((s) => s.isVisible === true)
			},
			registerSidebar (sidebar) {
				this.queue.push(sidebar)
			},
			unregisterSidebar (sidebar) {
				this.queue = this.getSidebarsExcept(sidebar.sidebarId)
			},
			toggleSidebar (sidebarId) {
				let sidebar = this.getSidebar(sidebarId)
				if (sidebar) {
					sidebar.toggle()
				}
			},
			openSidebar (sidebarId) {
				let sidebar = this.getSidebar(sidebarId)
				if (sidebar) {
					sidebar.open()
				}
			},
			queueToggleSidebar (sidebarId) {
				clearInterval(this.queueToggleInterval)
				this.queueToggleInterval = setInterval(function () {
					let sidebars = this.filterVisible(this.getSidebarsExcept(sidebarId))
					if (!sidebars.length) {
						this.toggleSidebar(sidebarId)
						clearInterval(this.queueToggleInterval)
					}
				}.bind(this), 50)
				this.getSidebarsExcept(sidebarId).forEach(function (sidebar) {
					sidebar.close()
				})
			},
			queueOpenSidebar (sidebarId) {
				this.openSidebar(sidebarId)
			}
		},
		beforeDestroy () {
			clearInterval(this.queueToggleInterval)
			this.$root.$off('toggle.tk.sidebar', this.queueToggleSidebar)
		},
		ready () {
			this.$root.$broadcast('context.tk.layout', this)
			this.$root.$on('toggle.tk.sidebar', this.queueToggleSidebar)
		},
		events: {
			'register-sidebar.tk.layout': function (sidebar) {
				this.registerSidebar(sidebar)
			},
			'unregister-sidebar.tk.layout': function (sidebar) {
				this.unregisterSidebar(sidebar)
			},
			'open-sidebar.tk.layout': function (sidebarId) {
				this.queueOpenSidebar(sidebarId)
			}
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