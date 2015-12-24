<script>
	import Sidebar from './sidebar.vue'
	import camelCase from 'mout/string/camelCase'

	export default {
		mixins: [ Sidebar ],
		data () {
			return {
				sidebarTransitions: false,
				animating: false,
				duration: 500
			}
		},
		props: {
			effect: {
				type: String,
				validator (value) {
					let effects = [
						'reveal',
						'slide-in',
						'slide-along',
						'slide-out-reverse',
						'scale-down',
						'scale-up',
						'scale-rotate',
						'open-door',
						'fall-down',
						'push',
						'push-rotate',
						'push-3d-rotate-in',
						'push-3d-rotate-out',
						'push-3d-rotate-delay'
					]
					return effects.indexOf(value) !== -1
				}
			},
			overlay: {
				type: Boolean
			}
		},
		computed: {
			sidebarClass () {
				var classes = this.sidebarBaseClass
				if (this.sidebarTransitionsEnabled()) {
					classes[this.sidebarEffectClass] = true
				}
				return classes
			},
			layoutSidebarTransitionClasses () {
				var classes = []
				if (this.size) {
					classes.push(this.layoutSidebarTransitionClass(this.size))
				}
				this.screens.forEach(function (screen) {
					let sizeProperty = camelCase('size-' + screen)
					if (this[sizeProperty]) {
						classes.push(this.layoutSidebarTransitionClass(this[sizeProperty], screen))
					}
				}, this)
				return classes.join(' ')
			},
			sidebarEffectClass () {
				return 'st-' + this.effect
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
			}
		},
		methods: {
			container () {
				return $('.st-container')
			},
			sidebarTransitionsEnabled () {
				var transitions = this.$parent.sidebarTransitions
				if (transitions && !this.effect) {
					transitions = false
				}
				return transitions
			},
			layoutSidebarTransitionClass (size, screen) {
				var className = 'st-effect-'
				className += this.direction
				className += size
				if (screen) {
					className += '-' + screen
				}
				return className
			},
			isAnimating () {
				if (!this.sidebarTransitionsEnabled()) {
					return false
				}
				return this.animating
			},
			onOpen () {
				Sidebar.methods.onOpen.call(this)
				if (this.sidebarTransitionsEnabled()) {
					this.onEnter()
				}
			},
			onClose () {
				if (this.sidebarTransitionsEnabled()) {
					this.notifyClose()
					this.onLeave()
				} 
				else {
					Sidebar.methods.onClose.call(this)
				}
			},
			onEnter () {
				clearTimeout(this.leaveTimer)
				$('html').addClass(this.layoutSidebarTransitionClasses)
				if (this.toggleLayout) {
					$('html').addClass(this.toggleLayoutClasses)
				}
				this.sidebar().addClass(this.sidebarEffectClass)
				this.container().addClass(this.sidebarEffectClass)
				if (this.overlay) {
					this.container().addClass('st-pusher-overlay')
				}
				this.isVisible = true
				this.enterTimer = setTimeout(function () {
					this.container().addClass('st-menu-open')
					this.sidebar().find('.simplebar').simplebar('recalculate')
				}.bind(this), 10)

				this.animating = false
				this.animatingTimer = setTimeout(function () {
					this.animating = false
				}.bind(this), this.duration)

				this.doneTimer = setTimeout(function () {
					this.container().addClass('st-done')
				}.bind(this), this.duration + 140)
			},
			onLeave () {
				clearTimeout(this.enterTimer)
				clearTimeout(this.animatingTimer)
				clearTimeout(this.doneTimer)
				this.container().removeClass('st-menu-open st-done')
				this.animating = true
				this.leaveTimer = setTimeout(function () {
					this.removeLayoutClasses()
					this.container().get(0).className = 'st-container'
					$('html').removeClass(this.layoutSidebarTransitionClasses)
					if (this.toggleLayout) {
						$('html').removeClass(this.toggleLayoutClasses)
					}
					this.isVisible = false
					this.animating = false
				}.bind(this), this.duration)
			}
		},
		beforeDestroy () {
			clearTimeout(this.enterTimer)
			clearTimeout(this.leaveTimer)
			clearTimeout(this.animatingTimer)
			clearTimeout(this.doneTimer)
		},
		ready () {
			if (this.$parent.$options.name === 'layout-transition') {
				if (this.effect && !this.$parent.sidebarTransitions) {
					this.$parent.sidebarTransitions = true
				}
				if (!this.effect) {
					this.$parent.sidebarTransitions = false
				}
			}
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/sidebar/transitions";
</style>