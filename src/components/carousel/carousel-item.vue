<template>
	<div class="item" :class="{ 'active': active }">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			active: {
				type: Boolean
			}
		},
		ready () {
			this.$dispatch('item.tk.carousel', this)
		}
	}
</script>