<template>
	<template v-if="dropdown">
		<div class="dropdown-container" v-el:dropdown-container>
			<ul>
				<li class="dropdown" :class="{ open: dropdown }" style="overflow: visible;">
					<ul class="dropdown-menu" :style="dropdownMenuStyle">
						<dropdown-menu-item
							v-for="dd in dropdown.children"
							:model="dd"
							@click="dropdown=null">
						</dropdown-menu-item>
					</ul>
				</li>
			</ul>
		</div>
	</template>
</template>

<script>
	import DropdownMenuItem from '../dropdown/dropdown-menu-item.vue'

	export default {
		data () {
			return {
				dropdown: null,
				dropdownContainerOffsetTop: null
			}
		},
		computed: {
			dropdownMenuStyle () {
				var top = (this.dropdown.offsetTop - this.dropdownContainerOffsetTop) + 'px'
				var style = { 
					left: '100%', 
					top: top 
				}
				if (this.position === 'right') {
					style.left = 'auto'
					style.right = '100%'
				}
				return style
			}
		},
		methods: {
			dropdownContainer () {
				return $(this.$els.dropdownContainer)
			},
			onReceiveDropdown (dropdown) {
				this.dropdown = dropdown
			},
			closeDropdown () {
				this.dropdown = null
			}
		},
		ready () {
			this.$parent.$on('dropdown.tk.sidebar', this.onReceiveDropdown)
			this.$parent.$el.addEventListener('mouseleave', this.closeDropdown)
		},
		beforeDestroy () {
			this.$parent.$off('dropdown.tk.sidebar', this.onReceiveDropdown)
			this.$parent.$el.removeEventListener('mouseleave', this.closeDropdown)
		},
		watch: {
			dropdown (value) {
				if (!value) {
					return this.$parent.$broadcast('close.tk.sidebar-dropdown-item')
				}
				this.$nextTick(() => {
					this.dropdownContainerOffsetTop = this.dropdownContainer().offset().top
				})
			}
		},
		events: {
			'scrolling.tk.sidebar': function (value) {
				if (value) {
					this.dropdown = null
				}
			} 
		},
		components: {
			DropdownMenuItem
		}
	}
</script>

<style lang="sass">
	@import "~themekit-sass/src/sidebar-menu/sidebar-dropdown";
</style>