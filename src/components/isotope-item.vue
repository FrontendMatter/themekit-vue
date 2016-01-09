<template>
	<div class="item col-xs-12">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		ready () {
			this.$dispatch('ready.tk.isotope-item', this)
		},
		beforeDestroy () {
			this.$dispatch('destroy.tk.isotope-item', this)
		}
	}
</script>