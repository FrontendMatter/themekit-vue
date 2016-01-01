<template>
	<template v-if="dropdown">
		<div class="dropdown-container" v-el:dropdown-container>
			<ul>
				<li class="dropdown" :class="{ open: dropdown }" style="overflow: visible;">
					<ul class="dropdown-menu" :style="dropdownMenuStyle">
						<dropdown-menu 
							v-for="dd in dropdown.model.children" 
							@click="dropdown=null" 
							:model="dd">
						</dropdown-menu>
					</ul>
				</li>
			</ul>
		</div>
	</template>
</template>

<script>
	import DropdownMenu from '../dropdown/dropdown-menu.vue'

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
				if (this.dropdown) {
					this.dropdown = null
				}
			},
			closeDropdownItems (currentItem) {
				this.$parent.$broadcast('close.tk.sidebar-dropdown-item', currentItem ? currentItem.submenuId : null)
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
				this.closeDropdownItems(value)
				if (value) {
					this.$nextTick(() => {
						this.dropdownContainerOffsetTop = this.dropdownContainer().offset().top
					})
				}
			}
		},
		events: {
			'scrolling.tk.sidebar': function (value) {
				if (value) {
					this.dropdown = null
				}
			},
			'ready.tk.sidebar-menu-item': function (item) {
				if (item.$options.name !== 'sidebar-dropdown-item') {
					item.$el.addEventListener('mouseenter', this.closeDropdown)
				}
			},
			'destroy.tk.sidebar-menu-item': function (item) {
				if (item.$options.name !== 'sidebar-dropdown-item') {
					item.$el.removeEventListener('mouseenter', this.closeDropdown)
				}
			}
		},
		components: {
			DropdownMenu
		}
	}
</script>

<style lang="sass">
	@import "../../../sass/sidebar-menu/sidebar-dropdown";
</style>