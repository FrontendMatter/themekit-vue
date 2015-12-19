<template>
	<a :href="'#' + sidebarId" @click.stop.prevent="toggle" :class="buttonClass">
		<template v-if="!toggleBar"><i class="{{ icon }}"></i></template>
	</a>
</template>

<script>
	export default {
		props: {
			sidebarId: {
				type: String,
				required: true
			},
			toggleBar: {
				type: Boolean
			},
			icon: {
				type: String,
				default: 'fa fa-bars'
			}
		},
		computed: {
			buttonClass () {
				var classes = ['toggle', 'pull-left', 'visible-xs']
				var classObj = {}
				if (this.hasParentNavbar()) {
					classes.forEach(function (className) {
						classObj[className] = true
					})
				}
				if (this.toggleBar) {
					classObj['sidebar-toggle-bar'] = true
				}
				return classObj
			}
		},
		ready () {
			this.button = $(this.$el)
		},
		methods: {
			toggle () {
				this.$dispatch('toggle.tk.sidebar', this.sidebarId)
			},
			hasParentNavbar () {
				return this.$parent.$options.name === 'navbar'
			}
		},
		events: {
			'open.tk.sidebar': function (sidebarId) {
				if (this.sidebarId !== sidebarId) {
					return
				}
				this.button
					.addClass('active')
					.closest('li')
					.addClass('active')
			},
			'close.tk.sidebar': function (sidebarId) {
				if (this.sidebarId !== sidebarId) {
					return
				}
				this.button
					.removeClass('active')
					.closest('li')
					.removeClass('active')
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/sidebar/toggle-bar";
</style>