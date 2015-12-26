<template>
	<div v-show="isVisible" :class="sidebarClass">
		
		<!-- Scrollable -->
		<template v-if="scrollable">
			<div v-scrollable>
				<slot></slot>
			</div>
		</template>
		
		<!-- Non Scrollable -->
		<template v-else>
			<slot></slot>
		</template>
		
		<!-- Toggle Bar -->
		<sidebar-toggle-button
			v-if="toggleBar" 
			:sidebar-id="sidebarId" 
			:toggle-bar="toggleBar"
			class="sidebar-toggle-bar">
		</sidebar-toggle-button>

		<!-- Dropdown Menu Type -->
		<template v-if="dropdown">
			<div class="dropdown-container" v-el:dropdown-container>
				<ul>
					<li class="dropdown open" style="overflow: visible;" v-el:dropdown-menu-container>
						<ul class="dropdown-menu" :style="dropdownMenuStyle">
							<sidebar-menu-item
								v-for="dd in dropdown.children"
								:label="dd.label"
								:icon="dd.icon"
								:active="dd.active"
								:link="dd.link"
								@click="dropdown=null">
							</sidebar-menu-item>
						</ul>
					</li>
				</ul>
			</div>
		</template>
	</div>
</template>

<script>
	import SidebarToggleButton from './sidebar-toggle-button.vue'
	import SidebarMenuItem from '../sidebar-menu/sidebar-menu-item.vue'
	import 'jquery.breakpoints/breakpoints'
	import camelCase from 'mout/string/camelCase'
	import objectKeys from 'mout/object/keys'
	import objectValues from 'mout/object/values'
	import forOwn from 'mout/object/forOwn'

	const sizes = ['1', '2', '3']
	const screens = ['xs', 'sm', 'md', 'lg']
	const breakpoints = {
		320: [],
		480: ['xs', 'xs-up'],
		768: ['sm', 'sm-up'],
		992: ['md', 'md-up'],
		1200: ['lg', 'lg-up'],
		1600: ['xl', 'xl-up']
	}
	const breakpointValues = objectKeys(breakpoints).map((v) => parseInt(v, 10))
	const breakpointClasses = []
	objectValues(breakpoints).forEach(function (v) {
		breakpointClasses.push.apply(breakpointClasses, v)
	})

	export default {
		data () {
			return {
				transformed: false,
				dropdown: null,
				scrolling: false,
				dropdownContainerOffsetTop: null,
				sizes: sizes,
				screens: screens,
				isVisible: false,
				offsetValue: null,
				visibleNotProvided: 'sm-up'
			}
		},
		props: {
			scrollable: {
				type: Boolean,
				default: true
			},
			position: {
				type: String,
				default: 'left'
			},
			size: {
				type: String,
				validator (value) {
					return sizes.indexOf(value) !== -1
				}
			},
			sizeXs: {
				type: String,
				validator (value) {
					return sizes.indexOf(value) !== -1
				}
			},
			sizeSm: {
				type: String,
				validator (value) {
					return sizes.indexOf(value) !== -1
				}
			},
			sizeMd: {
				type: String,
				validator (value) {
					return sizes.indexOf(value) !== -1
				}
			},
			sizeLg: {
				type: String,
				validator (value) {
					return sizes.indexOf(value) !== -1
				}
			},
			visible: {
				type: String,
				validator (value) {
					let values = value.split(' ')
					return values.filter((v) => breakpointClasses.indexOf(v) !== -1).length
				},
				coerce (value) {
					if (value) {
						let values = value.split(' ')
						return values.filter((v) => breakpointClasses.indexOf(v) !== -1).join(' ')
					}
				}
			},
			menuType: {
				type: String,
				default: 'collapse'
			},
			offset: {
				type: String
			},
			toggleBar: {
				type: Boolean
			},
			sidebarId: {
				type: String,
				default: 'sidebar'
			},
			toggleLayout: {
				type: String
			},
			show: {
				type: Boolean
			},
			mini: {
				type: Boolean
			},
			reveal: {
				type: Boolean
			},
			miniRevealSize: {
				type: String,
				default: '2',
				validator (value) {
					return ['2', '3'].indexOf(value) !== -1
				}
			}
		},
		computed: {
			sidebarSizeClasses () {
				var classes = []
				if (this.size) {
					classes.push(this.sidebarSizeClass(this.size))
				}
				screens.forEach(function (screen) {
					let sizeProperty = camelCase('size-' + screen)
					if (this[sizeProperty]) {
						classes.push(this.sidebarSizeClass(this[sizeProperty], screen))
					}
				}, this)
				return classes
			},
			layoutClasses () {
				var classes = []
				if (this.offsetValue) {
					classes.push(`sidebar-${ this.direction }-sum-${ this.size }${ this.offsetValue }`)
				}
				else {
					if (this.size) {
						classes.push(this.layoutClass(this.size))
					}
					screens.forEach(function (screen) {
						let sizeProperty = camelCase('size-' + screen)
						if (this[sizeProperty]) {
							classes.push(this.layoutClass(this[sizeProperty], screen))
						}
					}, this)
				}
				return classes
			},
			visibleOptions () {
				if (!this.visible) {
					return []
				}
				return this.visible.split(' ')
			},
			sidebarVisibleClass () {
				return this.visibleOptions.map(function (className) {
					return `sidebar-visible-${ className }`
				})
			},
			sidebarBaseClass () {
				var classes = {
					'sidebar': true,
					'sidebar-mini': this.mini && !this.reveal,
					'sidebar-mini-reveal': this.mini && this.reveal,
					'sidebar-visible': this.isVisible
				}
				if (this.miniRevealSize) {
					classes['sidebar-mini-reveal-size-' + this.miniRevealSize] = this.mini && this.reveal
				}
				this.sidebarVisibleClass.forEach(function (className) {
					classes[className] = true
				})
				this.sidebarSizeClasses.forEach(function (className) {
					classes[className] = true
				}, this)
				classes[this.position] = true
				if (this.offsetValue) {
					classes['sidebar-offset-' + this.offsetValue] = true
				}
				if (this.scrolling) {
					classes['scrolling'] = true
				}
				return classes
			},
			sidebarClass () {
				return this.sidebarBaseClass
			},
			direction () {
				return this.position.charAt(0)
			},
			dropdownMenuStyle () {
				var top = (this.dropdown.offsetTop - this.dropdownContainerOffsetTop) + 'px'
				var style = { 
					left: '100%', 
					top: top 
				}
				if (this.position === 'right') {
					style.left = 'auto'
					style.right = '100%'
				}
				return style
			}
		},
		methods: {
			sidebar () {
				return $(this.$el)
			},
			dropdownContainer () {
				return $(this.$els.dropdownContainer)
			},
			dropdownMenuContainer () {
				return $(this.$els.dropdownMenuContainer)
			},
			broadcast () {
				this.$broadcast('context.tk.sidebar', this)
			},
			sidebarTransitionsEnabled () {
				return document.querySelector('.st-layout')
			},
			layoutClass (size, screen) {
				var baseClass = 'sidebar-'
				baseClass += this.direction
				baseClass += size
				if (screen) {
					baseClass += '-' + screen
				}
				return baseClass
			},
			sidebarSizeClass (size, screen) {
				var className = 'sidebar-size'
				if (screen) {
					className += '-' + screen
				}
				className += '-' + size
				return className
			},
			makeCollapse () {
				if (this.menuType !== 'collapse') {
					this.menuType = 'collapse'
				}
			},
			makeDropdown () {
				if (this.menuType !== 'dropdown') {
					this.menuType = 'dropdown'
				}
			},
			breakpoints (reset) {
				$(window).setBreakpoints({
					breakpoints: breakpointValues
				})

				// @TODO: provide options for menuType breakpoints
				// breakpointValues.forEach(function (breakpoint) {
				// 	let breakpointName = `enterBreakpoint${ breakpoint }`
				// 	if (breakpoint <= 480) {
				// 		$(window)[reset ? 'off' : 'on'](breakpointName, this.makeCollapse)
				// 		$(window)[reset ? 'off' : 'on'](`exitBreakpoint${ breakpoint }`, this.makeCollapse)
				// 	}
				// 	else {
				// 		$(window)[reset ? 'off' : 'on'](breakpointName, this.makeDropdown)
				// 	}
				// }, this)

				// always close on xs
				$(window)[reset ? 'off' : 'on']('enterBreakpoint320', this.close)
				$(window)[reset ? 'off' : 'on']('enterBreakpoint480', this.close)

				forOwn(breakpoints, function (values, key, object) {
					this.visibleOptions.forEach(function (visible) {
						if (values.indexOf(visible) !== -1) {
							let isUp = visible.indexOf('up') !== -1
							let up = breakpointValues.filter((v) => v > key)

							let down = breakpointValues.filter((v) => v < key)
							down.forEach(function (breakpoint) {
								$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, this.close)
							}, this)

							if (isUp) {
								up.unshift(key)
								up.forEach(function (breakpoint) {
									$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, this.queueOpen)
								}, this)
							}
							else {
								$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ key }`, this.queueOpen)
								up.forEach(function (breakpoint) {
									$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, this.close)
								}, this)
							}
						}
					}, this)
				}.bind(this))
			},
			resetBreakpoints () {
				this.breakpoints(true)
			},
			open () {
				if (this.show) {
					return this.onOpen()
				}
				this.show = true
			},
			close () {
				this.show = false
			},
			toggle () {
				this.show = !this.show
			},
			queueOpen () {
				setTimeout(function () {
					this.$dispatch('open-sidebar.tk.layout', this.sidebarId)
				}.bind(this), 10)
			},
			onOpen () {
				this.emit('show')
				this.addLayoutClasses()
				this.isVisible = true
				this.emit('shown')
				this.emit('change')
			},
			onClose () {
				this.emit('hide')
				this.removeLayoutClasses()
				this.isVisible = false
				this.emit('hidden')
				this.emit('change')
			},
			emit (eventName) {
				this.$root.$broadcast(`${ eventName }.tk.sidebar`, this)
			},
			initDropdown () {
				var self = this
				this.sidebar().on('mouseleave', function () {
					self.dropdown = null
				})

				// @TODO: Nested Dropdown Submenus
				// this.dropdownMenuContainer()
				//     .on('mouseover', function () {
				//         $(this).addClass('open').children('ul').removeClass('submenu-hide').addClass('submenu-show');
				//     }).on('mouseout', function () {
				//         $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
				//         self.sidebar().find('open').removeClass('open');
				//     });
			},
			removeDropdown () {
				this.sidebar().off('mouseleave')
			},
			addLayoutClasses () {
				this.layoutClasses.map(function (className) {
					document.querySelector('html').classList.add(className)
				})
			},
			removeLayoutClasses () {
				this.layoutClasses.map(function (className) {
					document.querySelector('html').classList.remove(className)
				})
			},
			setOffsetValue (sidebar) {
				this.removeLayoutClasses()
				this.offsetValue = sidebar.show ? sidebar.size : null
				if (this.show) {
					this.addLayoutClasses()
				}
			},
			registerSidebar () {
				this.$dispatch('register-sidebar.tk.layout', this)
			},
			unregisterSidebar () {
				this.$dispatch('unregister-sidebar.tk.layout', this)
			}
		},
		ready () {
			this.registerSidebar()
			this.broadcast()
			if (this.mini) {
				this.size = '1'
			}
			if (this.menuType === 'dropdown') {
				this.initDropdown()
			}
			this.$nextTick(function () {
				if (!this.visibleOptions.length && !this.sidebarTransitionsEnabled()) {
					this.visible = this.visibleNotProvided
				}
				this.breakpoints()
				if (this.show) {
					this.onOpen()
				}
			})
		},
		beforeDestroy () {
			this.removeLayoutClasses()
			this.unregisterSidebar()
			this.resetBreakpoints()
		},
		watch: {
			dropdown (value) {
				if (!value) {
					return this.sidebar().find('.open').removeClass('open')
				}
				this.$nextTick(function () {
					this.dropdownContainerOffsetTop = this.dropdownContainer().offset().top
				})
			},
			menuType (value) {
				this.broadcast()
				switch (value) {
					default: 
						break
					case 'collapse':
						this.dropdown = null
						this.removeDropdown()
						break
					case 'dropdown':
						this.initDropdown()
						break
				}
			},
			scrolling (value) {
				if (value && this.menuType === 'dropdown') {
					this.dropdown = null
				}
			},
			scrollable (value) {
				this.broadcast()
			},
			show (value) {
				this[ value ? 'onOpen' : 'onClose' ]()
			}
		},
		events: {
			'request-context.tk.sidebar': function () {
				this.broadcast()
			},
			'dropdown.tk.sidebar': function (dropdown) {
				this.dropdown = dropdown
				if (dropdown) {
					this.dropdownMenuContainer().addClass('open')
				}
			},
			'scrolling.tk.scrollable': function () {
				if (!this.scrolling) {
					this.scrolling = true
				}
			},
			'end-scrolling.tk.scrollable': function () {
				if (this.scrolling) {
					this.scrolling = false
				}
			},
			'ready.tk.sidebar': function (sidebar) {
				if (this.offset === sidebar.sidebarId) {
					this.setOffsetValue(sidebar)
				}
			},
			'change.tk.sidebar': function (sidebar) {
				if (this.offset === sidebar.sidebarId) {
					this.setOffsetValue(sidebar)
				}
			}
		},
		components: {
			SidebarToggleButton,
			SidebarMenuItem
		}
	}
</script>

<style lang="less">
	// CORE
	@import "~themekit-less/src/sidebar/layout";
	@import "~themekit-less/src/sidebar/scrollable";
	@import "~themekit-less/src/sidebar/sidebar-mini";
	@import "~themekit-less/src/sidebar/toggle-bar";

	// ELEMENTS
	@import "~themekit-less/src/sidebar-elements/badge";
	@import "~themekit-less/src/sidebar-elements/brand";
	@import "~themekit-less/src/sidebar-elements/datepicker";
	@import "~themekit-less/src/sidebar-elements/list-group";
	@import "~themekit-less/src/sidebar-elements/media";
	@import "~themekit-less/src/sidebar-elements/panel";
	@import "~themekit-less/src/sidebar-elements/progress";
	@import "~themekit-less/src/sidebar-elements/slider";
</style>