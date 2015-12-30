<script>
	import shortid from 'shortid'

	export default {
		name: 'sidebar-menu-item',
		data () {
			return {
				open: false
			}
		},
		props: {
			model: {
				type: Object
			}
		},
		computed: {
			submenuId () {
				if (!this.isSubmenu) {
					return null
				}
				return `sm-${ shortid.generate() }`
			},
			isSubmenu () {
				return this.model.children && this.model.children.length
			},
			routeActive () {
				return this.$route && this.model.route && this.model.route === this.$route
			},
			active () {
				return this.routeActive || this.model.active
			}
		},
		beforeDestroy () {
			this.$dispatch('destroy.tk.sidebar-menu-item', this)
		},
		ready () {
			this.$dispatch('ready.tk.sidebar-menu-item', this)
		}
	}
</script>