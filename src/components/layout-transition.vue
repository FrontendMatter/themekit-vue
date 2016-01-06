<template>

	<div class="la-co">

		<div class="st-co">

			<!-- Navbar -->
			<slot name="navbar"></slot>

			<!-- Sidebars -->
			<slot name="sidebar"></slot>

			<!-- sidebar effects OUTSIDE of st-pu: -->
			<!-- reveal, slide-in, slide-along, slide-out-reverse, scale-down, scale-up, scale-rotate, open-door, fall-down -->

			<!-- content push wrapper -->
			<div class="st-pu">

				<!-- Sidebars -->
				<slot name="sidebar-push"></slot>

				<!-- sidebar effects INSIDE of st-pu: -->
				<!-- push, push-rotate, push-3d-rotate-in, push-3d-rotate-out, push-3d-rotate-delay -->

				<!-- this is the wrapper for the content -->
				<div class="st-cnt">

					<!-- extra div for emulating position:fixed of the menu -->
					<div class="la-cnt" v-scrollable>

						<!-- Navbar Content -->
						<slot name="navbar-content"></slot>

						<!-- Content -->
						<slot></slot>

					</div>
					<!-- /la-cnt -->

				</div>
				<!-- /st-cnt -->

			</div>
			<!-- /st-pu -->

		</div>

	</div>

</template>

<script>
	import Layout from './layout.vue'

	export default {
		name: 'layout-transition',
		mixins: [ Layout ],
		methods: {
			enableSidebarTransitions () {
				this.$el.classList.add('st-la')
			},
			disableSidebarTransitions () {
				this.$el.classList.remove('st-la')
			},
			filterAnimating (sidebars) {
				return sidebars.filter((s) => s.animating && s.sidebarTransitionsEnabled() && s.isAnimating())
			},
			queueOpenSidebar (sidebarId) {
				clearInterval(this.queueOpenInterval)
				this.queueOpenInterval = setInterval(function () {
					let sidebars = this.filterAnimating(this.getSidebarsExcept(sidebarId))
					if (!sidebars.length) {
						this.openSidebar(sidebarId)
						clearInterval(this.queueOpenInterval)
					}
				}.bind(this), 50)
			}
		},
		ready () {
			this.$off('toggle.tk.sidebar', this.toggleSidebar)
			this.$on('toggle.tk.sidebar', this.queueToggleSidebar)
			this.enableSidebarTransitions()
		},
		beforeDestroy () {
			this.$off('toggle.tk.sidebar', this.queueToggleSidebar)
			this.disableSidebarTransitions()
			clearInterval(this.queueOpenInterval)
		},
		events: {
			'open-sidebar.tk.layout': function (sidebarId) {
				this.queueOpenSidebar(sidebarId)
			}
		}
	}
</script>