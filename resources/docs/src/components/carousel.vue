<script>
	import component from '../../../../src/components/carousel'
	import merge from 'mout/object/merge'

	let docs = merge(component, {
		description: `Create a [Bootstrap Carousel](http://getbootstrap.com/javascript/#carousel) element.`,
		props: {
			indicators: {
				description: `Enable the carousel indicators.`
			},
			controls: {
				description: `Enable the carousel controls.`
			}
		}
	})

	export default docs
</script>