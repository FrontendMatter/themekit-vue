<template>
	
	<div class="layout-container">

		<!-- Navbar -->
		<slot name="navbar"></slot>

		<!-- Sidebars -->
		<slot name="sidebar"></slot>

		<!-- Content -->
		<div class="layout-content" v-scrollable>
			<slot></slot>
		</div>

	</div>

</template>

<script>
	export default {
		name: 'layout',
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
				this.$el.classList.add('show-sidebar')
			},
			onCloseSidebar (sidebarId) {
				if (!this.filterVisible(this.getSidebarsExcept(sidebarId)).length) {
					this.$el.classList.remove('show-sidebar')
				}
			},
			queueToggleSidebar (sidebarId) {
				let sidebar = this.getSidebar(sidebarId)
				if (!sidebar) {
					return true	
				}
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
				let elements = ['html', 'body', this.$el]
				elements.forEach(function (element) {
					let e = typeof element === 'string' ? document.querySelector(element) : element
					e.style.overflow = 'hidden'
					e.style.height = '100%'	
				})
			},
			disableScrollableContent () {
				let elements = ['html', 'body', this.$el]
				elements.forEach(function (element) {
					let e = typeof element === 'string' ? document.querySelector(element) : element
					e.removeAttribute('style')
				})
			},
			emitIsotopeLayout () {
				this.$broadcast('layout.tk.isotope', this)
			}
		},
		beforeDestroy () {
			clearInterval(this.queueToggleInterval)
			this.$off('toggle.tk.sidebar', this.toggleSidebar)
			this.disableScrollableContent()
		},
		ready () {
			this.$root.$broadcast('context.tk.layout', this)
			this.$on('toggle.tk.sidebar', this.toggleSidebar)
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
			},
			'change.tk.sidebar': function () {
				this.emitIsotopeLayout()
			},
			'hidden.tk.sidebar': function (sidebar) {
				this.onCloseSidebar(sidebar.sidebarId)
			}
		}
	}
</script>

<style lang="sass">
	@import "../sass/layout/content";
	@import "../sass/layout/footer";
	@import "../sass/layout/grid";
	@import "../sass/layout/split";
	@import "../sass/layout/scrollable";
</style>