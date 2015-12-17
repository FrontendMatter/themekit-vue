<template>
	<div v-el:cover :class="coverClass">
		<img v-el:image :src="src" />
		<div :class="overlayClass">
			<span class="v-center">
				<slot></slot>
			</span>
			<span class="v-top">
				<slot name="top"></slot>
			</span>
			<span class="v-bottom">
				<slot name="bottom"></slot>
			</span>
		</div>
	</div>
</template>

<script>
	var Cover = require('./cover.vue');
	module.exports = {
		mixins: [ Cover ]
	}
</script>