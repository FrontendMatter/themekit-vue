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
			this.$nextTick(function () {
				$(this.$el).find('a').on('shown.bs.tab', this.shown)
				$(this.$el).find('.active a').trigger('shown.bs.tab')
			})
		},
		events: {
			'tabs-nav.tk.tabs': function (data) {
				if (this.navId === data.navId) {
					this.tabs.push(data.tab)
				}
			}
		}
	}
</script>