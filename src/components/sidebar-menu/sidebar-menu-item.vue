<template>
	<li class="sidebar-menu-item" :class="{ active: active, 'hasSubmenu': isSubmenu, open: open }">
		<template v-if="isSubmenu">
			<a class="sidebar-menu-button"
				v-el:submenu-button
				:href="'#' + submenuId" 
				:data-toggle="menuType == 'collapse' ? 'collapse' : false"
				:aria-expanded="open">
				<i class="sidebar-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
			<ul class="sidebar-submenu"
				v-el:submenu-element 
				v-show="menuType == 'collapse'"
				:id="submenuId" 
				:class="{ collapse: menuType == 'collapse', 'in': open }">
				<sidebar-menu-item 
					v-for="child in model.children"
					:model="child">
				</sidebar-menu-item>
			</ul>
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
	import shortid from 'shortid'
	import camelCase from 'mout/string/camelCase'

	export default {
		name: 'sidebar-menu-item',
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
			menuType () {
				if (this.model.type) {
					return this.model.type
				}
				return 'collapse'
			},
			submenuId () {
				if (!this.isSubmenu) {
					return null
				}
				return `sm-${ shortid.generate() }`
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
		},
		methods: {
			initMenuType (menuType) {
				return menuType 
					? camelCase('init-' + menuType) 
					: (this.menuType ? camelCase('init-' + this.menuType) : null)
			},
			removeMenuType (menuType) {
				return menuType 
					? camelCase('remove-' + menuType) 
					: (this.menuType ? camelCase('remove-' + this.menuType) : null)
			},
			item () {
				return $(this.$el)
			},
			submenuElement () {
				return $(this.$els.submenuElement)
			},
			submenuButton () {
				return $(this.$els.submenuButton)
			},
			menuButton () {
				return $(this.$els.menuButton)
			},
			sidebarElement () {
				return $(this.$el).parents('.sidebar:first')
			},
			initSubmenu (value) {
				var menuTypeMethod = this.initMenuType(value)
				if (!menuTypeMethod) {
					return
				}
				if (typeof this[menuTypeMethod] === 'function') {
					this[menuTypeMethod]()
				}
			},
			removeSubmenu (value) {
				var menuTypeMethod = this.removeMenuType(value)
				if (!menuTypeMethod) {
					return
				}
				if (typeof this[menuTypeMethod] === 'function') {
					this[menuTypeMethod]()
				}
			},
			initCollapse () {
				var self = this
				this.submenuElement().on('show.bs.collapse', function (e) {
					e.stopPropagation()
					$(this).parents('ul:first').find('> li.open > ul').collapse('hide')
					self.open = true
				})
				this.submenuElement().on('hidden.bs.collapse', function (e) {
					e.stopPropagation()
					self.open = false
				})
			},
			removeCollapse () {
				this.submenuButton().off()
				this.submenuElement().off()
				this.submenuElement().removeClass('in')
				this.submenuButton().removeClass('collapsed')
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
			initMenu () {
				if (this.menuType !== 'dropdown') {
					this[ this.isSubmenu ? 'submenuButton' : 'menuButton' ]()
						.on('mouseenter', this.emitDropdownClose)
				}
				if (this.isSubmenu) {
					this.initSubmenu(this.menuType)
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
			},
			emitActive () {
				if (this.menuType === 'collapse' && this.active) {
					this.$dispatch('active.tk.sidebar-menu-item', this)
				}
			}
		},
		ready () {
			this.initMenu()
			this.emitActive()
		},
		beforeDestroy () {
			this.removeSubmenu()
		},
		watch: {
			menuType (newValue, oldValue) {
				this.removeSubmenu(oldValue)
				this.initMenu()
			},
			active () {
				this.emitActive()
			},
			open (value) {
				if (this.menuType === 'dropdown') {
					this[ value ? 'emitDropdownOpen' : 'emitDropdownClose' ]()
				}
			}
		},
		events: {
			'active.tk.sidebar-menu-item': function (item) {
				if (this.isSubmenu && this.menuType === 'collapse') {
					this.open = true
				}
				return true
			},
			'close.tk.sidebar-menu-item': function () {
				if (this.menuType === 'dropdown') {
					this.open = false
				}
			}
		}
	}
</script>