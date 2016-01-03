<template>
	<div class="expandable expandable-trigger" :class="expandableClass" v-on:click="toggle">
		<div class="expandable-content" :class="contentClass">
			<slot></slot>
			<div class="expandable-indicator" v-on:click.stop="toggle($event)" v-el:indicator><i></i></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'expandable',
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
			expandableClass () {
				var obj = {
					'expandable-open': this.open
				}
				if (this.indicatorColor) {
					obj['expandable-indicator-' + this.indicatorColor] = true
				}
				return obj
			},
			contentClass () {
				var obj = {}
				if (this.contentSize) {
					obj['expandable-content-' + this.contentSize] = true
				}
				return obj
			}
		},
		methods: {
			toggle (e) {
				if (e && e.currentTarget !== this.$els.indicator && this.open) {
					return
				}
				this.open = !this.open
			}
		}
	}
</script>

<style lang="sass">
	@import "../sass/elements/expandable";
</style>