<template>
	<div v-if="heading" class="sidebar-category">{{ heading }}</div>
	<div class="sidebar-block" :class="sidebarBlockClass">
		<slot></slot>
	</div>
</template>

<script>
	module.exports = {
		props: {
			heading: {
				type: String
			},
			padding: {
				type: String
			}
		},
		computed: {
			sidebarBlockClass: function() {
				var obj = {};
				if (this.padding == 'equal')
					obj['equal-padding'] = true;
				if (this.padding == 'none')
					obj['padding-none'] = true;

				return obj;
			}
		}
	}
</script>

<style lang="less">
    @import "~themekit-less/src/sidebar-elements/sidebar-block";
</style>