<script>
	import shortid from 'shortid'
	import deepMatches from 'mout/object/deepMatches'

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
				return this.$route && this.model.route && deepMatches(this.$route, this.model.route)
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