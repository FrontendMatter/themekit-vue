<template>
	<div v-el:cover :class="coverClass">
		<img v-el:image :src="src" :alt="label" />
		<a v-link="link" :class="overlayClass">
			<span class="v-center">
				<span class="text-h1" v-if="label">{{ label }}</span>
				<span class="text-h2" v-if="labelSm">{{ labelSm }}</span>
				<span class="text-h3" v-if="labelXs">{{ labelXs }}</span>
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
				type: String
			},
			labelSm: {
				type: String
			},
			labelXs: {
				type: String
			},
			link: {
				type: Object
			}
		}
	}
</script>