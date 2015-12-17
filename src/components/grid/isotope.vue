<template>
	<div class="row">
		<slot></slot>
	</div>
</template>

<script>
	var Isotope = require('isotope-layout');
	require('isotope-packery');
	module.exports = {
		data: function() {
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
			broadcast: function() {
				this.$broadcast('isotope.layout');
			},
			handleResize: function() {
				this.$nextTick(function() {
					this.isotope.layout();
				});
			},
			debouncedResize: function() {
				clearTimeout(this.resizeTimer);
				this.resizeTimer = setTimeout(this.handleResize, 10);
			}
		},
		ready: function() {

			this.$el.classList.add('isotope');

			var columns = this.$el.children;
			for(var i=0; i<columns.length; i++) {
				['item', 'col-xs-12'].forEach(function(className) {
					columns[i].classList.add(className);
				}.bind(this));
			}

			this.isotope = new Isotope(this.$el, {
				layoutMode: this.layoutMode,
				itemSelector: this.itemSelector,
				percentPosition: true,
				transitionDuration: 0,
				isResizeBound: false
			});

			this.isotope.on('layoutComplete', this.broadcast);
			window.addEventListener('resize', this.debouncedResize);
			this.debouncedResize();
		},
		beforeDestroy: function() {
			this.isotope.off('layoutComplete', this.broadcast);
			window.removeEventListener('resize', this.debouncedResize);
		},
		events: {
			'isotope.layout': function(sender) {
				if (sender && sender !== this) {
					this.handleResize();
				}
			}
		}
	}
</script>