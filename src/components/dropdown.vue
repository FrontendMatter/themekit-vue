<template>
	<div :class="containerClass" :aria-role="ariaRole">
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
			openEvent: {
				default: 'click'
			},
			class: {
				type: String
			},
			ariaRole: {
				type: String
			}
		},
		computed: {
			containerClass () {
				let obj = { 
					dropdown: true, 
					active: this.active, 
					hasSubmenu: this.isSubmenu, 
					open: this.open
				}
				if (this.class) {
					obj[this.class] = true
				}
				return obj
			}
		},
		methods: {
			toggle (e) {
				if (/input|textarea/i.test(e.target.tagName)) {
					return
				}
				this.open = !this.open
			},
			show () {
				this.open = true
			},
			hide () {
				this.open = false
			},
			rootHide (e) {
				if (!this.$el || /input|textarea/i.test(e.target.tagName)) {
					return
				}
				if (e.target === this.$el || this.$el.contains(e.target)) {
					return
				}
				this.hide() 
			},
			getTree (dropdown) {
				let tree = []
				if (dropdown && dropdown.$options.name && dropdown.$options.name.indexOf('dropdown') !== -1) {
					tree.push(dropdown)
					if (dropdown.$parent) {
						return tree.concat(this.getTree(dropdown.$parent))
					}
				}
				return tree
			},
			emit (eventName) {
				this.$dispatch(`${ eventName }.tk.dropdown`, this)
			},
			propagate (propagate) {
				if (propagate) {
					return true
				}
				return false
			}
		},
		ready () {
			if (this.openEvent === 'click') {
				this.$el.addEventListener('click', this.toggle)
			}
			else if (this.openEvent === 'mouseenter') {
				this.$el.addEventListener('mouseenter', this.show)
				this.$el.addEventListener('mouseleave', this.hide)
			}
		},
		beforeDestroy () {
			if (this.openEvent === 'click') {
				this.$el.removeEventListener('click', this.toggle)
			}
			else if (this.openEvent === 'mouseenter') {
				this.$el.removeEventListener('mouseenter', this.show)
				this.$el.removeEventListener('mouseleave', this.hide)
			}
		},
		watch: {
			open (value) {
				if (value) {
					// close lower dropdown menus
					this.$broadcast('close.tk.dropdown', this)
					// close dropdown menu tree
					this.$root.$broadcast('close.tk.dropdown', this.getTree(this), true)
					// bind root
					this.$root.$el.addEventListener('click', this.rootHide)
					this.emit('opened')
				}
				else {
					this.$root.$el.removeEventListener('click', this.rootHide)
					this.emit('closed')
				}
			}
		},
		events: {
			'close.tk.dropdown': function (dropdown, propagate) {
				dropdown = (dropdown && Array.isArray(dropdown) && dropdown.indexOf(this) !== -1)
				dropdown = dropdown || dropdown === this
				if (dropdown) {
					return this.propagate(propagate)
				}
				this.hide()
				return this.propagate(propagate)
			},
			'open.tk.dropdown': function () {
				this.show()
			}
		}
	}
</script>

<style>
	div.dropdown {
		display: inline-block;
	}
</style>