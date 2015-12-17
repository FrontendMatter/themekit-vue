<template>
	<div class="item" :class="{ 'active': active }">
		<slot></slot>
	</div>
</template>

<script>
	module.exports = {
		props: {
			active: {
				type: Boolean
			}
		},
		ready: function() {
			this.$dispatch('carousel-item', this);
		}
	}
</script>