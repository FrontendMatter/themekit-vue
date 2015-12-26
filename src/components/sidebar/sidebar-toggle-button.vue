<template>
	<a href="#" @click.stop.prevent="toggle" :class="buttonClass">
		<i v-if="icon" class="{{ icon }}"></i>
		<span v-if="label">{{ label }}</span>
	</a>
</template>

<script>
	export default {
		data () {
			return {
				active: false
			}
		},
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
				var classes = {
					'active': this.active
				}
				return classes
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
			},
			show (sidebar) {
				if (this.sidebarId === sidebar.sidebarId) {
					this.active = true
					this.button()
						.closest('li')
						.addClass('active')
				}
			},
			hide (sidebar) {
				if (this.sidebarId === sidebar.sidebarId) {
					this.active = false
					this.button()
						.closest('li')
						.removeClass('active')
				}
			}
		},
		events: {
			'show.tk.sidebar': function (sidebar) {
				this.show(sidebar)
			},
			'hide.tk.sidebar': function (sidebar) {
				this.hide(sidebar)
			},
			'shown.tk.sidebar': function (sidebar) {
				this.show(sidebar)
			},
			'hidden.tk.sidebar': function (sidebar) {
				this.hide(sidebar)
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/sidebar/toggle-bar";
</style>