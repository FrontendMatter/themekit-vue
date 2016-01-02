<script>
	export default {
		props: {
			attach: {
				type: Boolean,
				default: true
			},
			attachTo: {
				type: String,
				default: 'body'
			}
		},
		ready () {
			if (this.attach && this.attachTo && $(this.attachTo).length) {
				$(this.$el).appendTo(this.attachTo)
			}
		},
		beforeDestroy () {
			$(this.$el).remove()
		}
	}
</script>