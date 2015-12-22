<template>
	<a :href="'#' + sidebarId" @click.stop.prevent="toggle" :class="buttonClass">
		<i v-if="icon" class="{{ icon }}"></i>
		<span v-if="label">{{ label }}</span>
	</a>
</template>

<script>
	export default {
		props: {
			sidebarId: {
				type: String,
				required: true
			},
			icon: {
				type: String
			},
			label: {
				type: String
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
				return classObj
			}
		},
		methods: {
			button () {
				return $(this.$el)
			},
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
				this.button()
					.addClass('active')
					.closest('li')
					.addClass('active')
			},
			'close.tk.sidebar': function (sidebarId) {
				if (this.sidebarId !== sidebarId) {
					return
				}
				this.button()
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