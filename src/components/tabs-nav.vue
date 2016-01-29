<template>
	<ul :class="navClass">
		<li v-for="tab in tabs" v-show="tab.visible">
			<a href="#{{ tab.tabId }}" data-toggle="tab">
				<i v-if="tab.icon" :class="tab.icon"></i>
				<template v-if="tab.label">{{ tab.label }}</template>
			</a>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default () {
					return []
				}
			},
			navId: {
				type: String,
				required: true
			},
			responsive: {
				type: Boolean
			}
		},
		methods: {
			isNavbar () {
				return this.$parent.$options.name === 'navbar'
			},
			emit (eventName, e) {
				let tabId = e.target.getAttribute('href').split('#')[1]
				this.$root.$broadcast(`${ eventName }.tk.tab`, tabId)
			}
		},
		computed: {
			navClass () {
				var obj = {
					'nav': true,
					'nav-tabs': !this.isNavbar(),
					'navbar-nav': this.isNavbar()
				}
				if (this.responsive) {
					obj['tabs-responsive-' + this.responsive] = true
				}
				return obj
			},
			active () {
				return this.tabs.find((t) => t.active === true)
			},
			events () {
				return ['show', 'shown', 'hide', 'hidden']
			}
		},
		ready () {
			this.events.forEach((eventName) => {
				$(this.$el).on(`${ eventName }.bs.tab`, '[data-toggle="tab"]', this.emit.bind(this, eventName))
			})
		},
		beforeDestroy () {
			this.events.forEach((eventName) => {
				$(this.$el).off(`${ eventName }.bs.tab`, '[data-toggle="tab"]', this.emit.bind(this, eventName))
			})
		},
		watch: {
			active (tab) {
				if (tab) {
					$(`[href="#${ tab.tabId }"]`).tab('show')
				}
			}
		},
		events: {
			'tabs-nav-item.tk.tabs': function (data) {
				if (this.navId === data.navId) {
					const exists = this.tabs.find((t) => t.tabId === data.tab.tabId)
					if (exists) {
						this.tabs.map((t, index) => {
							if (t.tabId === data.tab.tabId) {
								this.tabs[index] = Object.assign({}, this.tabs[index], data.tab)
							}
						})
					}
					else {
						this.tabs.push(data.tab)
					}
				}
			},
			'tabs-nav-destroy.tk.tabs': function (navId) {
				if (this.navId === navId) {
					this.tabs = []
				}
			}
		}
	}
</script>