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
			}
		},
		ready () {
			if (!depsLoaded) {
				return
			}
			this.$el.classList.add('isotope')
			var columns = this.$el.children
			for (var i = 0; i < columns.length; i++) {
				['item', 'col-xs-12'].forEach(function (className) {
					columns[i].classList.add(className)
				})
			}

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
			this.debouncedResize()
		},
		beforeDestroy () {
			if (!depsLoaded) {
				return
			}
			this.isotope.off('layoutComplete', this.broadcast)
			window.removeEventListener('resize', this.debouncedResize)
		},
		events: {
			'layout.tk.isotope': function (sender) {
				if (!depsLoaded) {
					return
				}
				if (sender && sender !== this) {
					this.handleResize()
				}
			}
		}
	}
</script>