<template>
	<div class="row">
		<slot></slot>
	</div>
</template>

<script>
	var depsLoaded

	// optional externals
	try {
		require('isotope-layout')
		require('isotope-packery')
		depsLoaded = true
	}
	catch (e) {
		depsLoaded = false
	}

	export default {
		data () {
			return {
				isotope: null,
				resizeTimer: null
			}
		},
		props: {
			layoutMode: {
				type: String,
				default: 'packery'
			},
			itemSelector: {
				type: String,
				default: '.item'
			}
		},
		methods: {
			broadcast () {
				this.$broadcast('layout.tk.isotope')
			},
			handleResize () {
				this.$nextTick(function () {
					this.isotope.layout()
				})
			},
			debouncedResize () {
				clearTimeout(this.resizeTimer)
				this.resizeTimer = setTimeout(this.handleResize, 10)
			},
			init () {
				if (depsLoaded) {
					this.$el.classList.add('isotope')

					/*global Isotope*/
					this.isotope = new Isotope(this.$el, {
						layoutMode: this.layoutMode,
						itemSelector: this.itemSelector,
						percentPosition: true,
						transitionDuration: 0,
						isResizeBound: false
					})

					this.isotope.on('layoutComplete', this.broadcast)
					window.addEventListener('resize', this.debouncedResize)
				}
			},
			destroy () {
				if (this.isotope) {
					this.isotope.off('layoutComplete', this.broadcast)
					window.removeEventListener('resize', this.debouncedResize)
					this.isotope.destroy()
				}
			}
		},
		ready () {
			this.init()
		},
		beforeDestroy () {
			this.destroy()
		},
		events: {
			'ready.tk.isotope-item': function (item) {
				if (this.isotope) {
					this.isotope.insert(item.$el)
				}
			},
			'destroy.tk.isotope-item': function (item) {
				if (this.isotope) {
					this.isotope.remove(item.$el)
					this.isotope.layout()
				}
			},
			'layout.tk.isotope': function (sender) {
				if (this.isotope && sender && sender !== this) {
					this.handleResize()
				}
			}
		}
	}
</script>