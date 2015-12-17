<template>
	<div class="expandable expandable-trigger" :class="expandableClass" @click="toggle">
		<div class="expandable-content" :class="contentClass">
			<slot></slot>
			<div class="expandable-indicator" @click.stop="toggle($event)" v-el:indicator><i></i></div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: {
			open: {
				type: Boolean
			},
			contentSize: {
				type: String
			},
			indicatorColor: {
				type: String
			}
		},
		computed: {
			expandableClass: function() {
				var obj = {
					'expandable-open': this.open
				};
				if (this.indicatorColor)
					obj['expandable-indicator-' + this.indicatorColor] = true;
				return obj;
			},
			contentClass: function() {
				var obj = {};
				if (this.contentSize)
					obj['expandable-content-' + this.contentSize] = true;
				return obj;
			}
		},
		methods: {
			toggle: function(e) {
				if (e && e.currentTarget !== this.$els.indicator && this.open) 
					return;
				this.open = !this.open;
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/elements/expandable";
</style>