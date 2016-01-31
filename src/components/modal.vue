<template>
	<div :class="modalClass" :id="id" v-if="true" v-transfer-dom>
		<div class="modal-dialog" :class="dialog">
			<div class="v-cell">
				<div class="modal-content" :class="content">
					<div class="modal-header" v-if="header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
						<h4 class="modal-title">{{ title }}</h4>
					</div>
					<div class="modal-body">
						<slot name="body">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam atque consequuntur dolore fugiat fugit hic in ipsam iure magnam maxime quaerat, quam qui repellat repellendus temporibus vel vitae voluptate!
						</slot>
					</div>
					<div class="modal-footer" v-if="footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" @click="save">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				hasAbort: {
					save: false
				}
			}
		},
		props: {
			id: {
				type: String,
				required: true
			},
			title: {
				type: String,
				default: 'Modal title'
			},
			header: {
				type: Boolean,
				default: true
			},
			footer: {
				type: Boolean,
				default: true
			},
			fade: {
				type: Boolean
			},
			slide: {
				type: Boolean
			},
			slideDirection: {
				type: String,
				default: 'down',
				validator (value) {
					return ['left', 'right', 'up', 'down'].indexOf(value) !== -1
				}
			},
			sidebar: {
				type: Boolean
			},
			sidebarSize: {
				type: String,
				default: '3',
				validator (value) {
					return ['1', '2', '3'].indexOf(value) !== -1
				}
			},
			sidebarSizeXs: {
				type: String,
				default: '1',
				validator (value) {
					return ['1', '2', '3'].indexOf(value) !== -1
				}
			},
			grow: {
				type: Boolean
			},
			overlay: {
				type: Boolean
			},
			backdrop: {
				type: String
			},
			panel: {
				type: Boolean
			},
			size: {
				type: String,
				validator (value) {
					return ['small', 'large'].indexOf(value) !== -1
				}
			}
		},
		computed: {
			isFade () {
				return this.fade || this.slide || this.sidebar
			},
			computedSlideDirection () {
				if (this.sidebar && ['left', 'right'].indexOf(this.slideDirection) === -1) {
					return 'left'
				}
				return this.slideDirection
			},
			slideDirectionClass () {
				return 'slide-' + this.computedSlideDirection
			},
			modalClass () {
				var obj = {
					'modal': true,
					'fade': this.isFade,
					'grow': this.grow,
					'modal-overlay': this.overlay
				}
				if (this.sidebar || this.slide) {
					obj[this.slideDirectionClass] = true
				}
				if (this.backdrop) {
					obj['modal-backdrop-' + this.backdrop] = true
				}
				if (this.panel) {
					obj['modal-panel-default'] = true
				}
				return obj
			},
			dialog () {
				var obj = {}
				if (this.sidebar) {
					obj['sidebar'] = true
					obj[this.computedSlideDirection] = true
					obj['si-offset-0'] = true
					obj['si-si-' + this.sidebarSize] = true
					obj['si-si-xs-' + this.sidebarSizeXs] = true
				}
				return obj
			},
			content () {
				var obj = {
					'modal-sm': this.size === 'small',
					'h-center': this.size === 'small',
					'modal-lg': this.size === 'large'
				}
				return obj
			},
			element () {
				return document.querySelector(`#${this.id}`)
			}
		},
		methods: {
			setupEvents () {
				$(this.element)
					.on('show.bs.modal', this.showBackdrop)
					.on('hidden.bs.modal', this.hideBackdrop)

				let events = ['show', 'hide', 'shown', 'hidden']
				events.forEach((eventName) => {
					$(this.element).on(`${ eventName }.bs.modal`, () => {
						this.emit.call(this, eventName)
					})
				})
			},
			showBackdrop () {
				if (this.backdrop) {
					$('body').addClass('modal-backdrop-' + this.backdrop)
				}
			},
			hideBackdrop () {
				if (this.backdrop) {
					$('body').removeClass('modal-backdrop-' + this.backdrop)
				}
			},
			emit (eventName) {
				this.hasAbort[eventName] = false
				this.$dispatch(`${ eventName }.tk.modal`, this)
			},
			save () {
				this.emit('save')
			},
			modal (methodName) {
				$(this.element).modal(methodName)
			},
			show () {
				this.modal('show')
			},
			hide () {
				this.modal('hide')
			},
			abort (hook) {
				this.hasAbort[hook] = true
			},
			next (hook) {
				this.hasAbort[hook] = false
			}
		},
		beforeDestroy () {
			$('.modal-backdrop').remove()
		},
		ready () {
			this.emit('ready')
			this.setupEvents()
			if ($('body').hasClass('modal-open')) {
				this.show()
			}
		},
		events: {
			'save.tk.modal': function (modal) {
				if (modal.id === this.id && !this.hasAbort.save) {
					this.hide()
				}
			}
		}
	}
</script>

<style lang="sass">
	@import "../sass/elements/modal";
</style>