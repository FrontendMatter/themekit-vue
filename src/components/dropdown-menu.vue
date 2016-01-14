<template>
	<dropdown-list-item
		:is-submenu="isSubmenu" 
		:active="active" 
		:open-event="openEvent" 
		:aria-role="ariaItemRole"
		@opened.tk.dropdown="ariaExpanded('true')"
		@closed.tk.dropdown="ariaExpanded('false')">
		<template>
			<template v-if="isSubmenu">
				<a class="dropdown-menu-button" href="#" @click.prevent v-el:toggle>
					<i class="dropdown-menu-icon" v-if="model.icon" :class="model.icon"></i>
					<span>{{ model.label }}</span>
				</a>
				<ul class="dropdown-menu dropdown-submenu" :role="ariaRole">
					<dropdown-menu 
						v-for="child in model.children" 
						:model="child"
						:aria-role="ariaRole"
						:aria-item-role="ariaItemRole">
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
	</dropdown-list-item>
</template>

<script>
	import DropdownListItem from './dropdown-list-item'
	import deepMatches from 'mout/object/deepMatches'

	export default {
		name: 'dropdown-menu',
		props: {
			model: {
				type: Object
			},
			openEvent: {
				default: 'click'
			},
			ariaRole: {
				type: String,
				default: 'menu'
			},
			ariaItemRole: {
				type: String,
				default: 'menuitem'
			}
		},
		computed: {
			hasChildren () {
				return typeof this.model.children !== 'undefined'
			},
			isSubmenu () {
				return this.hasChildren && this.model.children.length > 0
			},
			routeActive () {
				return this.$route && this.model.route && deepMatches(this.$route, this.model.route)
			},
			active () {
				return this.routeActive === true || this.model.active === true
			}
		},
		methods: {
			closeMenuTree () {
				this.$broadcast('close.tk.dropdown', this, true)
			},
			ariaExpanded (value) {
				if (this.isSubmenu) {
					this.$els.toggle.setAttribute('aria-expanded', value)
				}
			}
		},
		components: {
			DropdownListItem
		}
	}
</script>

<style lang="sass">
	@import "../sass/dropdown/dropdown-menu";
</style>