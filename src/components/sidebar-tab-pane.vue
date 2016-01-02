<script>
	import TabPane from './tab-pane.vue'

	export default {
		mixins: [ TabPane ],
		props: {
			scrollable: {
				type: Boolean,
				default: true
			}
		}
	}
</script>