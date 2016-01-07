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
			class="sidebar-toggle-bar">
		</sidebar-toggle-button>

		<slot name="root"></slot>
	</div>
</template>

<script>
	import SidebarToggleButton from './sidebar-toggle-button.vue'
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
		name: 'sidebar',
		data () {
			return {
				scrolling: false,
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
						classes.push(this.layoutClass(this.direction, this.size))
					}
					screens.forEach(function (screen) {
						let sizeProperty = camelCase('size-' + screen)
						if (this[sizeProperty]) {
							classes.push(this.layoutClass(this.direction, this[sizeProperty], screen))
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
				return this.visibleOptions.map((className) => {
					return `sidebar-visible-${ className }`
				})
			},
			sidebarBaseClass () {
				var classes = {
					'sidebar': true,
					'sidebar-mini': this.mini && !this.reveal,
					'sidebar-mini-reveal': this.mini && this.reveal,
					'si-vi': this.isVisible
				}
				if (this.miniRevealSize) {
					classes['sidebar-mini-reveal-size-' + this.miniRevealSize] = this.mini && this.reveal
				}
				this.sidebarVisibleClass.forEach((className) => {
					classes[className] = true
				})
				this.sidebarSizeClasses.forEach((className) => {
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
			}
		},
		methods: {
			sidebar () {
				return $(this.$el)
			},
			layout () {
				return this.sidebar().parents('.la-co:first')
			},
			sidebarTransitionsEnabled () {
				return this.layout().hasClass('st-la')
			},
			layoutClass (direction, size, screen) {
				var baseClass = 'si-'
				baseClass += direction
				baseClass += size
				if (screen) {
					baseClass += '-' + screen
				}
				return baseClass
			},
			sidebarSizeClass (size, screen) {
				var className = 'si-si'
				if (screen) {
					className += '-' + screen
				}
				className += '-' + size
				return className
			},
			breakpoints (reset) {
				$(window).setBreakpoints({ breakpoints: breakpointValues })

				// always close on xs
				$(window)[reset ? 'off' : 'on']('enterBreakpoint320', this.close)
				$(window)[reset ? 'off' : 'on']('enterBreakpoint480', this.close)

				forOwn(breakpoints, (values, key, object) => {
					this.visibleOptions.forEach((visible) => {
						if (values.indexOf(visible) !== -1) {
							let isUp = visible.indexOf('up') !== -1
							let up = breakpointValues.filter((v) => v > key)

							let down = breakpointValues.filter((v) => v < key)
							down.forEach((breakpoint) => {
								$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, this.close)
							}, this)

							if (isUp) {
								up.unshift(key)
								up.forEach((breakpoint) => {
									$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, this.queueOpen)
								}, this)
							}
							else {
								$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ key }`, this.queueOpen)
								up.forEach((breakpoint) => {
									$(window)[reset ? 'off' : 'on'](`enterBreakpoint${ breakpoint }`, this.close)
								}, this)
							}
						}
					}, this)
				})
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
				setTimeout(() => {
					this.$dispatch('open-sidebar.tk.layout', this.sidebarId)
				}, 10)
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
				this.$dispatch(`${ eventName }.tk.sidebar`, this)
				this.$parent.$broadcast(`${ eventName }.tk.sidebar`, this)
			},
			addLayoutClasses () {
				this.layout().addClass(this.layoutClasses.join(' '))
			},
			removeLayoutClasses (layoutClasses) {
				this.layout().removeClass((layoutClasses || this.layoutClasses).join(' '))
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
			if (this.mini) {
				this.size = '1'
			}
			this.$nextTick(() => {
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
			show (value) {
				this[ value ? 'onOpen' : 'onClose' ]()
			},
			scrolling (value) {
				this.$broadcast('scrolling.tk.sidebar', value)
			},
			direction (newValue, oldValue) {
				if (oldValue) {
					this.removeLayoutClasses([this.layoutClass(oldValue, this.size)])
				}
				if (this.show) {
					this.addLayoutClasses()
				}
			},
			size (newValue, oldValue) {
				if (oldValue) {
					this.removeLayoutClasses([this.layoutClass(this.direction, oldValue)])
				}
				if (this.show) {
					this.addLayoutClasses()
				}
				if (newValue !== '1' && this.mini) {
					this.mini = false
				}
			},
			mini (newValue) {
				if (newValue) {
					this.size = '1'
				}
				else if (this.size === '1') {
					this.size = '2'
				}
			}
		},
		events: {
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
			},
			'scrollable.tk.sidebar': function (value) {
				this.scrollable = value
			},
			'ready.tk.sidebar-menu-item': function (item) {
				this.$broadcast('ready.tk.sidebar-menu-item', item)
			},
			'destroy.tk.sidebar-menu-item': function (item) {
				this.$broadcast('destroy.tk.sidebar-menu-item', item)
			}
		},
		components: {
			SidebarToggleButton
		}
	}
</script>

<style lang="sass">
	// CORE
	@import "../sass/sidebar/layout";
	@import "../sass/sidebar/scrollable";
	@import "../sass/sidebar/sidebar-mini";
	@import "../sass/sidebar/toggle-bar";
	// ELEMENTS
	@import "../sass/sidebar-elements/sidebar-block";
	@import "../sass/sidebar-elements/badge";
	@import "../sass/sidebar-elements/brand";
	@import "../sass/sidebar-elements/datepicker";
	@import "../sass/sidebar-elements/list-group";
	@import "../sass/sidebar-elements/media";
	@import "../sass/sidebar-elements/panel";
	@import "../sass/sidebar-elements/progress";
	@import "../sass/sidebar-elements/slider";
</style>