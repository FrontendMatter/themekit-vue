<template>
	<ul :class="navClass">
		<li v-for="tab in tabs" :class="{ active: tab.active }">
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
			shown (e) {
				let tabId = e.target.getAttribute('href').split('#')[1]
				this.$root.$broadcast('shown.tk.tab', tabId)
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
			}
		},
		ready () {
			$('body').on('shown.bs.tab', '[data-toggle="tab"]', this.shown)
		},
		beforeDestroy () {
			$('body').off('shown.bs.tab', '[data-toggle="tab"]', this.shown)
		},
		events: {
			'tabs-nav-item.tk.tabs': function (data) {
				if (this.navId === data.navId) {
					this.tabs.push(data.tab)
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