<template>

	<div class="st-container">

		<!-- Navbar -->
		<slot name="navbar"></slot>

		<!-- Sidebars -->
		<slot name="sidebar"></slot>

		<!-- sidebar effects OUTSIDE of st-pusher: -->
		<!-- reveal, slide-in, slide-along, slide-out-reverse, scale-down, scale-up, scale-rotate, open-door, fall-down -->

		<!-- content push wrapper -->
		<div class="st-pusher">

			<!-- Sidebars -->
			<slot name="sidebar-push"></slot>

			<!-- sidebar effects INSIDE of st-pusher: -->
			<!-- push, push-rotate, push-3d-rotate-in, push-3d-rotate-out, push-3d-rotate-delay -->

			<!-- this is the wrapper for the content -->
			<div class="st-content">

				<!-- extra div for emulating position:fixed of the menu -->
				<div class="layout-content st-content-inner" v-scrollable>

					<!-- Navbar Content -->
					<slot name="navbar-content"></slot>

					<!-- Content -->
					<slot></slot>

				</div>
				<!-- /st-content-inner -->

			</div>
			<!-- /st-content -->

		</div>
		<!-- /st-pusher -->

	</div>

</template>

<script>
	import Layout from './layout.vue'

	export default {
		mixins: [ Layout ],
		data () {
			return {
				sidebarTransitions: false
			}
		},
		methods: {
			enableSidebarTransitions () {
				document.querySelector('html').classList.add('st-layout')
			},
			disableSidebarTransitions () {
				document.querySelector('html').classList.remove('st-layout')
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
		beforeDestroy () {
			clearInterval(this.queueOpenInterval)
		},
		watch: {
			sidebarTransitions (value) {
				if (value) {
					return this.enableSidebarTransitions()
				}
				this.disableSidebarTransitions()
			}
		}
	}
</script>