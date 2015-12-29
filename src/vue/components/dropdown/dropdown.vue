<template>
	<li v-if="isList" :class="containerClass"
		@mouseenter="show()"
		@mouseleave="hide()"
		@click="toggle($event)">
		<slot></slot>
	</li>
	<div v-else :class="containerClass" 
		@mouseenter="show()"
		@mouseleave="hide()"
		@click="toggle($event)">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				open: false
			}
		},
		props: {
			isSubmenu: {
				type: Boolean
			},
			active: {
				type: Boolean
			},
			onClick: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			containerClass () {
				return { 
					dropdown: true, 
					active: this.active, 
					hasSubmenu: this.isSubmenu, 
					open: this.open
				}
			}
		},
		methods: {
			toggle (event) {
				if (this.onClick) {
					this.open = !this.open
					event.stopPropagation()
				}
			},
			show () {
				if (!this.onClick) {
					this.open = true
				}
			},
			hide () {
				if (!this.onClick) {
					this.open = false
				}
			},
			closePageDropdownMenus () {
				this.$root.$broadcast('close.tk.dropdown', null, true)
			},
			getTree (dropdown) {
				let tree = []
				if (!dropdown) {
					return tree
				}
				if (dropdown.$options.name === 'dropdown') {
					tree.push(dropdown)
				}
				return tree.concat(this.getTree(dropdown.$parent))
			},
			propagate (propagate) {
				if (propagate) {
					return true
				}
				return false
			}
		},
		ready () {
			if (this.onClick) {
				this.$root.$el.addEventListener('click', this.closePageDropdownMenus)
			}
		},
		beforeDestroy () {
			if (this.onClick) {
				this.$root.$el.removeEventListener('click', this.closePageDropdownMenus)
			}
		},
		watch: {
			open (value) {
				if (value) {
					// close lower dropdown menus
					this.$broadcast('close.tk.dropdown', this)
					// close dropdown menu tree
					this.$root.$broadcast('close.tk.dropdown', this.getTree(this), true)
				}
			}
		},
		events: {
			'close.tk.dropdown': function (dropdown, propagate) {
				if (dropdown) {
					if (Array.isArray(dropdown) && dropdown.indexOf(this) !== -1) {
						return this.propagate(propagate)
					}
					if (!Array.isArray(dropdown) && dropdown === this) {
						return this.propagate(propagate)
					}
				}
				this.open = false
				return this.propagate(propagate)
			},
			'open.tk.dropdown': function (dropdown) {
				this.$broadcast('close.tk.dropdown', dropdown, true)
			}
		}
	}
</script>

<style>
	div.dropdown {
		display: inline-block;
	}
</style>