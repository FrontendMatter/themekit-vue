<script>
	import component from '../../../../src/components/carousel-item'
	import merge from 'mout/object/merge'

	let docs = merge(component, {
		description: `Add a carousel item element to the [carousel](#!/components/carousel) component.`,
		requirements: [
			'carousel'
		],
		props: {
			active: {
				description: `Make the carousel item element active.`
			}
		}
	})

	export default docs
</script>