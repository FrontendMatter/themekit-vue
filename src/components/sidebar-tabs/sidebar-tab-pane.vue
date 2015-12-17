<script>
	var TabPane = require('../tabs/tab-pane.vue');
	module.exports = {
		mixins: [ TabPane ],
		props: {
			scrollable: {
				type: Boolean,
				default: true
			}
		}
	}
</script>