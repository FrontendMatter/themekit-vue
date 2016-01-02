<template>
	<li class="sidebar-menu-item" :class="{ active: active, 'hasSubmenu': isSubmenu, open: open }">
		<template v-if="isSubmenu">
			<a class="sidebar-menu-button" :href="'#' + submenuId" @mouseenter="emitDropdownOpen">
				<i class="sidebar-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
		</template>
		<template v-else>
			<a class="sidebar-menu-button" v-link="model.route">
				<i class="sidebar-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
		</template>
	</li>
</template>

<script>
	import SidebarMenuItem from './sidebar-menu-item.vue'

	export default {
		name: 'sidebar-dropdown-item',
		mixins: [ SidebarMenuItem ],
		methods: {
			item () {
				return $(this.$el)
			},
			emitDropdown (value) {
				this.$dispatch('dropdown.tk.sidebar', value)
			},
			emitDropdownOpen () {
				this.open = true
				this.emitDropdown({
					submenuId: this.submenuId,
					model: this.model,
					offsetTop: this.item().offset().top
				})
			},
			emitDropdownClose () {
				this.emitDropdown(null)
			}
		},
		events: {
			'close.tk.sidebar-dropdown-item': function (submenuId) {
				if (this.open && submenuId !== this.submenuId) {
					this.open = false
				}
			}
		}
	}
</script>