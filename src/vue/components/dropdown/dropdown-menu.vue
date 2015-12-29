<template>
	<dropdown :is-submenu="isSubmenu" :active="active">
		<template>
			<template v-if="isSubmenu">
				<a class="dropdown-menu-button" href="#" @click.prevent>
					<i class="dropdown-menu-icon" v-if="model.icon" :class="model.icon"></i>
					<span>{{ model.label }}</span>
				</a>
				<ul class="dropdown-menu dropdown-submenu">
					<dropdown-menu 
						v-for="child in model.children" 
						:model="child">
					</dropdown-menu>
				</ul>
			</template>
			<template v-else>
				<a class="dropdown-menu-button" v-link="model.route" @click="closeMenuTree">
					<i class="dropdown-menu-icon" v-if="model.icon" :class="model.icon"></i>
					<span>{{ model.label }}</span>
				</a>
			</template>
		</template>
	</dropdown>
</template>

<script>
	import Dropdown from './dropdown.vue'

	export default {
		name: 'dropdown-menu',
		props: {
			model: {
				type: Object
			}
		},
		computed: {
			isSubmenu () {
				return this.model.children && this.model.children.length > 0
			},
			routeActive () {
				return this.$route && this.model.route && this.model.route.name && this.model.route.name === this.$route.name
			},
			active () {
				return this.routeActive || this.model.active
			}
		},
		methods: {
			closeMenuTree () {
				this.$broadcast('close.tk.dropdown', this, true)
			}
		},
		components: {
			Dropdown
		}
	}
</script>

<style lang="sass">
	@import "~themekit-vue/src/sass/dropdown/dropdown-menu";
</style>