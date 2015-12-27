<template>
	<li class="sidebar-menu-item" :class="{ active: active, 'hasSubmenu': isSubmenu, open: open }">
		<template v-if="isSubmenu">
			<a class="sidebar-menu-button" v-el:submenu-button :href="'#' + submenuId">
				<i class="sidebar-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
		</template>
		<template v-else>
			<a class="sidebar-menu-button" v-el:menu-button v-link="model.route">
				<i class="sidebar-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
		</template>
	</li>
</template>

<script>
	import SidebarMenuItem from '../sidebar-menu/sidebar-menu-item.vue'

	export default {
		name: 'sidebar-dropdown-item',
		mixins: [ SidebarMenuItem ],
		methods: {
			item () {
				return $(this.$el)
			},
			menuButton () {
				return $(this.$els.menuButton)
			},
			submenuButton () {
				return $(this.$els.submenuButton)
			},
			initDropdown () {
				var self = this
				this.submenuButton()
					.on('mouseenter', function () {
						self.open = true
					})
					.on('click', function (e) {
						e.preventDefault()
						e.stopPropagation()
					})
			},
			removeDropdown () {
				if (this.isSubmenu) {
					this.submenuButton().off()
					this.open = false
				}
				else {
					this.menuButton().off()
				}
			},
			emitDropdown (value) {
				this.$dispatch('dropdown.tk.sidebar', value)
			},
			emitDropdownOpen () {
				this.emitDropdown({
					label: this.model.label,
					icon: this.model.icon,
					active: this.active,
					route: this.model.route,
					offsetTop: this.item().offset().top,
					children: this.model.children
				})
			},
			emitDropdownClose () {
				this.emitDropdown(null)
			}
		},
		created () {
			this.$dispatch('add-event-listener.tk.sidebar', {
				namespace: 'sidebar-menu-item',
				event: 'mouseenter',
				listener: this.emitDropdownClose
			})
		},
		ready () {
			this.initDropdown()
		},
		beforeDestroy () {
			this.removeDropdown()
			this.$dispatch('remove-event-listener.tk.sidebar', {
				namespace: 'sidebar-menu-item',
				event: 'mouseenter',
				listener: this.emitDropdownClose
			})
		},
		watch: {
			open (value) {
				this[ value ? 'emitDropdownOpen' : 'emitDropdownClose' ]()
			}
		},
		events: {
			'close.tk.sidebar-dropdown-item': function () {
				this.open = false
			}
		}
	}
</script>