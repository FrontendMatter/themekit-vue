<template>

	<!-- Navbar -->
	<slot name="navbar"></slot>

	<!-- Sidebars -->
	<slot name="sidebar"></slot>

	<!-- Content -->
	<div class="layout-content" v-scrollable>
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
			registerSidebar (sidebar) {
				this.queue.push(sidebar)
			},
			unregisterSidebar (sidebar) {
				this.queue = this.getSidebarsExcept(sidebar.sidebarId)
			},
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
			onOpenSidebar () {
				document.querySelector('html').classList.add('show-sidebar')
			},
			onCloseSidebar (sidebarId) {
				if (!this.filterVisible(this.getSidebarsExcept(sidebarId)).length) {
					document.querySelector('html').classList.remove('show-sidebar')
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
			enableScrollableContent () {
				let elements = ['html', 'body']
				elements.forEach(function (element) {
					document.querySelector(element).style.overflow = 'hidden'
					document.querySelector(element).style.height = '100%'	
				})
			},
			disableScrollableContent () {
				let elements = ['html', 'body']
				elements.forEach(function (element) {
					document.querySelector(element).removeAttribute('style')
				})
			},
			emitIsotopeLayout () {
				this.$broadcast('layout.tk.isotope', this)
			}
		},
		beforeDestroy () {
			clearInterval(this.queueToggleInterval)
			this.$root.$off('toggle.tk.sidebar', this.toggleSidebar)
			this.disableScrollableContent()
		},
		ready () {
			this.$root.$broadcast('context.tk.layout', this)
			this.$root.$on('toggle.tk.sidebar', this.toggleSidebar)
			this.enableScrollableContent()
		},
		events: {
			'register-sidebar.tk.layout': function (sidebar) {
				this.registerSidebar(sidebar)
				this.$broadcast('ready.tk.sidebar', sidebar)
			},
			'unregister-sidebar.tk.layout': function (sidebar) {
				this.unregisterSidebar(sidebar)
			},
			'open-sidebar.tk.layout': function (sidebarId) {
				this.openSidebar(sidebarId)
			},
			'show.tk.sidebar': function () {
				this.onOpenSidebar()
				return true
			},
			'change.tk.sidebar': function () {
				this.emitIsotopeLayout()
				return true
			},
			'hidden.tk.sidebar': function (sidebar) {
				this.onCloseSidebar(sidebar.sidebarId)
				return true
			}
		}
	}
</script>

<style lang="sass">
	@import "~themekit-sass/src/layout/content";
	@import "~themekit-sass/src/layout/footer";
	@import "~themekit-sass/src/layout/grid";
	@import "~themekit-sass/src/layout/split";
	@import "~themekit-sass/src/layout/scrollable";
</style>