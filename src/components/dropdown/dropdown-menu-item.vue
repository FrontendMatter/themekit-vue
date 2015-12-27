<template>
	<li :class="{ active: active, 'hasSubmenu': isSubmenu, dropdown: isSubmenu, open: open }" 
		@mouseenter="open=true"
		@mouseleave="open=false">
		<template v-if="isSubmenu">
			<a class="dropdown-menu-button"
				v-el:submenu-button
				:href="'#' + submenuId">
				<i class="dropdown-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
			<ul class="dropdown-menu dropdown-submenu" v-el:submenu-element :id="submenuId">
				<dropdown-menu-item 
					v-for="child in model.children"
					:model="child">
				</dropdown-menu-item>
			</ul>
		</template>
		<template v-else>
			<a class="dropdown-menu-button" v-el:menu-button v-link="model.route">
				<i class="dropdown-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
		</template>
	</li>
</template>

<script>
	import shortid from 'shortid'

	export default {
		name: 'dropdown-menu-item',
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
				return `dm-${ shortid.generate() }`
			},
			isSubmenu () {
				return this.model.children && this.model.children.length
			},
			routeActive () {
				return this.$route && this.model.route && this.model.route.name && this.model.route.name === this.$route.name
			},
			active () {
				return this.routeActive || this.model.active
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/dropdown/dropdown-menu";
</style>