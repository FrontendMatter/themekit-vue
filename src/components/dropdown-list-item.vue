<template>
	<li :class="containerClass" :aria-role="ariaRole">
		<slot></slot>
	</li>
</template>

<script>
	import Dropdown from './dropdown'
	export default {
		mixins: [
			Dropdown
		]
	}
</script>