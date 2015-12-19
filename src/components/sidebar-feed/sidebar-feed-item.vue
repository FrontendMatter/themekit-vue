<script>
	export default {
		props: {
			unread: {
				type: Boolean
			},
			user: {
				type: String,
				required: true
			},
			action: {
				type: String,
				required: true
			},
			time: {
				type: String,
				required: true
			}
		},
		ready () {
			this.$dispatch('item.tk.sidebar-feed', this)
		}
	}
</script>