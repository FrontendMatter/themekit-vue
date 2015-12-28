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
		computed: {
			sidebarTabsClass () {
				var tabsClass = this.tabsClass
				tabsClass['sidebar-tabbable'] = true
				return tabsClass
			}
		},
		ready () {
			this.$dispatch('scrollable.tk.sidebar', false)
		}
	}
</script>

<style lang="sass">
	@import "~themekit-sass/src/sidebar-elements/sidebar-tabs";
</style>