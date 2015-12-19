<template>
	<nav class="navbar" v-bind:class="navbarClass">
		<div class="container-fluid">
			<div class="navbar-header">
				<slot name="sidebar-toggle-button"></slot>
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse{{ id }}">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<slot name="brand"></slot>
			</div>
			<div class="navbar-collapse collapse" id="collapse{{ id }}">
				<slot></slot>
			</div>
		</div>
	</nav>
</template>

<script>
	import shortid from 'shortid'

	export default {
		data () {
			return {
				id: shortid.generate()
			}
		},
		props: {
			skin: {
				type: String,
				required: false
			},
			fixed: {
				type: String,
				required: false
			},
			static: {
				type: String,
				required: false
			},
			absolute: {
				type: String,
				required: false
			},
			size: {
				type: String,
				required: false
			}
		},
		computed: {
			navbarClass () {
				var classes = {}
				if (this.skin) {
					classes['navbar-skin-' + this.skin] = true
				}
				else {
					classes['navbar-default'] = true
				}
				if (this.fixed) {
					classes['navbar-fixed-' + this.fixed] = true
				}
				if (this.static) {
					classes['navbar-static-' + this.static] = true
				}
				if (this.absolute) {
					classes['navbar-absolute-' + this.absolute] = true
				}
				if (this.size) {
					classes['navbar-size-' + this.size] = true
				}
				return classes
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/navbar/navbar";
</style>