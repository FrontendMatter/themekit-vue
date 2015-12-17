<template>
	<div :class="progress" :id="id"></div>
</template>

<script>
	var shortid = require('shortid');
	require('mprogress/build/css/mprogress.css');
	window.Mprogress = require('mprogress/build/js/mprogress');

	module.exports = {
		data: function() {
			return {
				id: 'mprogress-' + shortid.generate(),
				mp: null
			}
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			bufferValue: {
				type: Number,
				default: 0
			},
			type: {
				type: String,
				default: 'determinate',
				validator: function(value) {
					return ['determinate', 'indeterminate', 'buffer'].indexOf(value) !== -1;
				}
			},
			color: {
				type: String
			},
			mini: {
				type: Boolean
			}
		},
		computed: {
			template: function() {
				if (this.type === 'determinate') {
					return 1;
				} else if (this.type === 'indeterminate') {
					return 3;
				} else if (this.type === 'buffer') {
					return 2;
				}
			},
			progress: function() {
				var obj = {
					'mprogress': true,
					'mprogress-mini': this.mini
				};
				obj['mprogress-' + this.type] = true;
				if (this.color)
					obj['mprogress-' + this.color] = true;
				return obj;
			}
		},
		ready: function() {
			this.mp = new Mprogress({
				template: this.template,
				parent: '#' + this.id
			});
			this.mp.set(this.value);
		},
		watch: {
			value: function(value) {
				this.mp.set(value);
			},
			bufferValue: function(value) {
				this.mp.setBuffer(value);
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/elements/mprogress";
</style>