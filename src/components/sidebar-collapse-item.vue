<template>
	<li class="sidebar-menu-item" :class="{ active: active, 'hasSubmenu': isSubmenu, open: open }">
		<template v-if="isSubmenu">
			<a class="sidebar-menu-button"
				v-el:submenu-button
				:href="'#' + submenuId" 
				data-toggle="collapse"
				:aria-expanded="open">
				<i class="sidebar-menu-icon" v-if="model.icon" :class="model.icon"></i>
				<span>{{ model.label }}</span>
			</a>
			<ul class="sidebar-submenu collapse"
				v-el:submenu-element 
				:id="submenuId" 
				:class="{ 'in': open }">
				<sidebar-collapse-item 
					v-for="child in model.children"
					:model="child">
				</sidebar-collapse-item>
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
	import SidebarMenuItem from './sidebar-menu-item.vue'

	export default {
		name: 'sidebar-collapse-item',
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
			submenuElement () {
				return $(this.$els.submenuElement)
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
			emitActive () {
				if (this.active) {
					this.$dispatch('active.tk.sidebar-collapse-item', this)
				}
			}
		},
		ready () {
			this.initCollapse()
			this.emitActive()
		},
		beforeDestroy () {
			this.removeCollapse()
		},
		watch: {
			active () {
				this.emitActive()
			}
		},
		events: {
			'active.tk.sidebar-collapse-item': function (item) {
				if (this.isSubmenu) {
					this.open = true
				}
				return true
			},
			'add-event-listener.tk.sidebar-menu-item': function (data) {
				this[ this.isSubmenu ? 'submenuButton' : 'menuButton' ]()
					.on(data.event, data.listener)
			},
			'remove-event-listener.tk.sidebar-menu-item': function (data) {
				this[ this.isSubmenu ? 'submenuButton' : 'menuButton' ]()
					.off(data.event, data.listener)
			}
		}
	}
</script>