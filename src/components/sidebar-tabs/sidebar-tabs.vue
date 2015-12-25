<template>
	<div class="split-vertical">
		<slot name="brand"></slot>
		<div class="sidebar-block" :class="sidebarTabsClass" v-show="tabs.length">
			
			<!-- Tabs Nav -->
			<tabs-nav 
				v-if="!navId"
				:responsive="responsive" 
				:tabs="tabs">
			</tabs-nav>
			<!-- // END Tabs Nav -->

		</div>
		<div class="split-vertical-body">
			<div class="split-vertical-cell">
				<div class="tab-content sidebar-tab-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Tabs from '../tabs/tabs.vue'

	export default {
		mixins: [ Tabs ],
		events: {
			'context.tk.sidebar': function (sidebar) {
				sidebar.scrollable = false
				return true
			}
		},
		computed: {
			sidebarTabsClass () {
				var tabsClass = this.tabsClass
				tabsClass['sidebar-tabbable'] = true
				return tabsClass
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/sidebar-elements/sidebar-tabs";
</style>