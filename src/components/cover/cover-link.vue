<template>
	<div v-el:cover :class="coverClass">
		<img v-el:image :src="src" :alt="label" />
		<a v-link="link" :class="overlayClass">
			<span class="v-center">
				<span class="text-h1">{{ label }}</span>
			</span>
		</a>
	</div>
</template>

<script>
	import Cover from './cover.vue'

	export default {
		mixins: [ Cover ],
		props: {
			label: {
				type: String,
				required: true
			},
			link: {
				type: Object
			}
		}
	}
</script>