<script>
	import TabPane from '../tabs/tab-pane.vue'

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