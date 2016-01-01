<template>
	<div v-show="tabs.length" :class="tabsClass">

		<!-- Tabs Nav -->
		<tabs-nav 
			v-if="!navId"
			:responsive="responsive" 
			:tabs="tabs">
		</tabs-nav>
		<!-- // END Tabs Nav -->

		<div class="tab-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import TabsNav from './tabs-nav.vue'

	export default {
		props: {
			tabs: {
				type: Array,
				default () {
					return []
				}
			},
			responsive: {
				type: String
			},
			stacked: {
				type: Boolean,
				default: false
			},
			align: {
				type: String,
				default: 'left'
			},
			vertical: {
				type: Boolean
			},
			navId: {
				type: String
			}
		},
		computed: {
			tabsClass () {
				var obj = {
					'tabbable': true
				}
				if (this.tabsWithIcons.length === this.tabsWithoutLabels.length) {
					obj['tabs-icons'] = true
				}
				if (this.stacked) {
					obj['tabs-blocks'] = true
				}
				if (this.vertical) {
					obj['tabs-vertical'] = true
					if (['left', 'right'].indexOf(this.align) !== -1) {
						obj['tabs-' + this.align] = true
					}
				}
				else {
					if (this.align === 'center') {
						obj['tabs-center-h'] = true
					}
				}
				return obj
			},
			tabsWithIcons () {
				return this.tabs.filter(function (tab) {
					return typeof tab.icon !== 'undefined'
				})
			},
			tabsWithoutLabels () {
				return this.tabs.filter(function (tab) {
					return typeof tab.label === 'undefined'
				})
			}
		},
		events: {
			'tab-pane.tk.tabs': function (tab) {
				this.tabs.push(tab)
				if (this.navId) {
					this.$root.$broadcast('tabs-nav-item.tk.tabs', {
						navId: this.navId,
						tab: tab
					})	
				}
			}
		},
		beforeDestroy () {
			if (this.navId) {
				this.$root.$broadcast('tabs-nav-destroy.tk.tabs', this.navId)
			}
		},
		components: {
			TabsNav
		}
	}
</script>

<style lang="sass">
	@import "../../../sass/elements/tabs";
</style>