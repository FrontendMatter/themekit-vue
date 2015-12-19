<template>
	<li class="sidebar-menu-item" :class="{ active: active, 'hasSubmenu': submenu }">
		<template v-if="submenu">
			<a class="sidebar-menu-button"
				v-el:submenu-button
				:href="'#' + submenuId" 
				:data-toggle="menuType == 'collapse' ? 'collapse' : false">
				<i class="sidebar-menu-icon" v-if="icon" :class="icon"></i>
				<span>{{ label }}</span>
			</a>
			<ul class="sidebar-submenu"
				v-el:submenu-element 
				v-show="menuType == 'collapse'"
				:id="submenuId" 
				:class="{ collapse: menuType == 'collapse' }">
				<slot></slot>
			</ul>
		</template>
		<template v-else>
			<a class="sidebar-menu-button" v-el:menu-button v-link="link">
				<i class="sidebar-menu-icon" v-if="icon" :class="icon"></i>
				<span>{{ label }}</span>
			</a>
			<slot></slot>
		</template>
	</li>
</template>
<script>
	import shortid from 'shortid'
	import camelCase from 'mout/string/camelCase'

	export default {
		data () {
			return {
				sidebarEl: null,
				menuType: null
			}
		},
		computed: {
			submenuId () {
				if (!this.submenu) {
					return null
				}
				return shortid.generate()
			}
		},
		props: {
			link: {
				type: Object
			},
			href: {
				type: String
			},
			label: {
				type: String,
				default: 'Menu Item'
			},
			icon: {
				type: String
			},
			active: {
				type: Boolean
			},
			submenu: {
				type: Boolean
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
				return $(this.sidebarEl)
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
					var parents = $(this).parents('ul:first').find('> li.open > ul')
					if (parents.length) {
						parents.collapse('hide').closest('.hasSubmenu').removeClass('open')
					}
					self.item().addClass('open')
				})
				this.submenuElement().on('hidden.bs.collapse', function (e) {
					e.stopPropagation()
					self.item().removeClass('open')
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
						self.sidebarElement().find('.open').removeClass('open')
						if (!self.item().hasClass('open') && !self.sidebarElement().is('.scrolling')) {
							self.item().addClass('open')
							self.$dispatch('dropdown.tk.sidebar', {
								label: self.label,
								icon: self.icon,
								active: self.active,
								link: self.link,
								offsetTop: self.item().offset().top,
								children: self.$children
							})
						}
					})
					.on('click', function (e) {
						e.preventDefault()
						e.stopPropagation()
					})
			},
			removeDropdown () {
				if (this.submenu) {
					this.submenuButton().off()
					this.item().removeClass('dropdown open')
				}
				else {
					this.menuButton().off()
				}
			},
			invalidParent () {
				return ['sidebar-menu', 'sidebar-menu-item'].indexOf(this.$parent.$options.name) === -1
			}
		},
		ready () {
			if (this.invalidParent()) {
				return
			}
			if (this.$children.length && !this.submenu) {
				this.submenu = true
				this.$dispatch('request-context.tk.sidebar')
			}
		},
		beforeDestroy () {
			this.removeSubmenu()
		},
		watch: {
			menuType (newValue, oldValue) {
				var self = this
				this.removeSubmenu(oldValue)
				this.sidebarElement().find('.open').removeClass('open')
				if (!this.submenu && this.menuType === 'dropdown') {
					this.menuButton().on('mouseenter', function () {
						self.sidebarElement().find('.open').removeClass('open')
						self.$dispatch('dropdown.tk.sidebar', null)
					})
				}
				if (this.submenu) {
					this.$nextTick(function () {
						this.initSubmenu(newValue)
					})
				}
			}
		},
		events: {
			'context.tk.sidebar': function (context) {
				this.sidebarEl = context.$el
				this.menuType = context.menuType
			}
		}
	}
</script>