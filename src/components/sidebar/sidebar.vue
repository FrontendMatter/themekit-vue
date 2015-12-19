<template>
	<div :class="sidebarClass">
		
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
		<template v-if="toggleBar">
			<sidebar-toggle-button 
				:sidebar-id="sidebarId" 
				:toggle-bar="toggleBar">
			</sidebar-toggle-button>
		</template>

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
	import 'jquery.breakpoints/breakpoints.js'

	export default {
		data () {
			return {
				transformed: false,
				containerSelector: '.st-container',
				dropdown: null,
				scrolling: false,
				sidebarTransitions: false,
				dropdownContainerOffsetTop: null,
				animating: false
			}
		},
		props: {
			scrollable: {
				type: Boolean,
				default: true
			},
			effect: {
				type: String,
				default: '1'
			},
			position: {
				type: String,
				default: 'left'
			},
			size: {
				type: String,
				default: '2'
			},
			skin: {
				type: String,
				default: 'dark'
			},
			desktop: {
				type: Boolean,
				default: true
			},
			mobile: {
				type: Boolean
			},
			menuType: {
				type: String,
				default: 'collapse'
			},
			offset: {
				type: String,
				default: '0'
			},
			toggleBar: {
				type: Boolean
			},
			sidebarId: {
				type: String,
				default: 'sidebar'
			},
			duration: {
				type: Number,
				default: 550
			},
			overlay: {
				type: Boolean
			},
			toggleLayout: {
				type: String
			},
			show: {
				type: Boolean,
				default: true
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
			sizeClass () {
				return 'sidebar-size-' + this.size
			},
			layoutClass () {
				var baseClass = 'sidebar-'
				baseClass += this.position.charAt(0)
				baseClass += this.size
				return baseClass
			},
			sidebarClass () {
				var classes = {
					'sidebar': true,
					'sidebar-mini': this.mini && !this.reveal,
					'sidebar-mini-reveal': this.mini && this.reveal
				}
				if (this.miniRevealSize) {
					classes['sidebar-mini-reveal-size-' + this.miniRevealSize] = this.mini && this.reveal
				}
				if (this.desktop) {
					classes['sidebar-visible-desktop'] = true
				}
				if (this.mobile) {
					classes['sidebar-visible-mobile'] = true
				}
				classes[this.position] = true
				classes[this.sizeClass] = true
				classes['sidebar-skin-' + this.skin] = true
				classes['sidebar-offset-' + this.offset] = true

				if (this.show && this.sidebarTransitions) {
					classes[this.sidebarTransitionsEffectClass] = true
				}
				if (this.scrolling) {
					classes['scrolling'] = true
				}
				return classes
			},
			direction () {
				return this.position.charAt(0)
			},
			layoutSidebarTransitionEffectClass () {
				return 'st-effect-' + this.direction + this.size
			},
			sidebarTransitionsEffectClass () {
				return 'st-effect-' + this.effect
			},
			toggleLayoutClasses () {
				if (this.toggleLayout !== 'auto') {
					return this.toggleLayout.split(',').join(' ')
				}
				var match = new RegExp('sidebar-' + this.direction + '(\\S+)', 'ig')
				var layoutClasses = $('html').get(0).className.match(match)
				if (layoutClasses !== null && layoutClasses.length) {
					return layoutClasses.join(' ')
				}
				return false
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
			container () {
				return $(this.containerSelector)
			},
			dropdownContainer () {
				return $(this.$els.dropdownContainer)
			},
			dropdownMenuContainer () {
				return $(this.$els.dropdownMenuContainer)
			},
			makeCollapse () {
				if (this.menuType === 'collapse') return
				this.menuType = 'collapse'
			},
			makeDropdown () {
				if (this.menuType === 'dropdown') return
				this.menuType = 'dropdown'
			},
			setBreakpoints () {
				$(window).setBreakpoints()
				$(window).bind('enterBreakpoint480', this.makeCollapse)
				$(window).bind('enterBreakpoint768', this.makeDropdown)
				$(window).bind('enterBreakpoint1024', this.makeDropdown)
				$(window).bind('enterBreakpoint768', this.open)
				$(window).bind('enterBreakpoint1024', this.open)
				$(window).bind('enterBreakpoint480', this.close)
				if ($(window).width() <= 480) {
					this.close()
				}
			},
			isAnimating () {
				if (!this.sidebarTransitions) {
					return false
				}
				if (this.animating) {
					return true
				}
				this.animating = true
				setTimeout(function () {
					this.animating = false
				}.bind(this), this.duration)
				return false
			},
			open () {
				this.show = true
			},
			close () {
				this.show = false
			},
			toggle () {
				if (this.isAnimating()) {
					return false
				}
				this.show = !this.show
			},
			onOpen () {
				clearTimeout(this.resetTimer)

				// on mobile, allow only one sidebar to be open at the same time
				if ($(window).width() < 768 && this.container().hasClass('st-menu-open')) {
					return this.close()
				}

				var transitions = this.sidebarTransitions

				if (this.sidebar().hasClass('sidebar-visible-desktop') && $(window).width() >= 768) {
					transitions = false
				}

				this.$root.$broadcast('open.tk.sidebar', this.sidebarId)

				this.sidebar().show()

				if (!transitions) {
					$('html').addClass('show-sidebar')
					$('html').removeClass(this.layoutSidebarTransitionEffectClass)
					this.sidebar().removeClass(this.sidebarTransitionsEffectClass)
					this.sidebar().css('display', 'block')
					if (this.toggleLayout) $('html').removeClass(this.toggleLayoutClasses)
				}
				else {
					$('html').addClass(this.layoutSidebarTransitionEffectClass)
					if (this.toggleLayout) $('html').addClass(this.toggleLayoutClasses)
					this.sidebar().addClass(this.sidebarTransitionsEffectClass)
					this.container().addClass(this.sidebarTransitionsEffectClass)
					if (this.overlay) this.container().addClass('st-pusher-overlay')

					this.openTimer = setTimeout(function () {
						this.container().addClass('st-menu-open')
						this.sidebar().find('.simplebar').simplebar('recalculate')
					}.bind(this), 25)
				}
			},
			onClose () {
				clearTimeout(this.openTimer)

				if (!this.sidebarTransitions) {
					$('html').removeClass('show-sidebar')
					this.sidebar().css('display', 'none')
				}

				this.$root.$broadcast('close.tk.sidebar', this.sidebarId)

				if (!this.sidebarTransitions) return

				this.container().removeClass('st-menu-open')

				this.resetTimer = setTimeout(function () {
					$('html').removeClass(this.layoutSidebarTransitionEffectClass)
					this.sidebar().removeClass(this.sidebarTransitionsEffectClass)
					this.container().get(0).className = 'st-container'
					this.sidebar().hide()
					if (this.toggleLayout) $('html').removeClass(this.toggleLayoutClasses)
				}.bind(this), this.duration)
			},
			broadcast () {
				this.$broadcast('context.tk.sidebar', this)
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
			}
		},
		ready () {
			var self = this
			if (this.mini) {
				this.size = '1'
			}
			['show-sidebar', this.layoutClass].map(function (className) {
				document.querySelector('html').classList.add(className)
			})
			this.setBreakpoints()
			this.$root.$on('toggle.tk.sidebar', function (sidebarId) {
				if (self.sidebarId !== sidebarId) return
				self.toggle()
			})
			if (this.menuType === 'dropdown') {
				this.initDropdown()
			}
			this.broadcast()
		},
		watch: {
			dropdown (value) {
				if (value) {
					this.$nextTick(function () {
						this.dropdownContainerOffsetTop = this.dropdownContainer().offset().top
					})
				}
				else {
					this.sidebar().find('.open').removeClass('open')
				}
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
				this.$nextTick(function () {
					this[ value ? 'onOpen' : 'onClose' ]()
				})
			}
		},
		events: {
			'context.tk.layout': function (context) {
				this.sidebarTransitions = context.sidebarTransitions
			},
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
	@import "~themekit-less/src/sidebar/transitions";
	@import "~themekit-less/src/sidebar/scrollable";
	@import "~themekit-less/src/sidebar/sidebar-mini";
	@import "~themekit-less/src/sidebar/toggle-bar";

	// ELEMENTS
	@import "~themekit-less/src/sidebar-elements/badge";
	@import "~themekit-less/src/sidebar-elements/brand";
	@import "~themekit-less/src/sidebar-elements/category";
	@import "~themekit-less/src/sidebar-elements/datepicker";
	@import "~themekit-less/src/sidebar-elements/list-group";
	@import "~themekit-less/src/sidebar-elements/media";
	@import "~themekit-less/src/sidebar-elements/panel";
	@import "~themekit-less/src/sidebar-elements/progress";
	@import "~themekit-less/src/sidebar-elements/slider";
</style>