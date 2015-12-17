<template>
	<div :class="modal" :id="id">
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
						<button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
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
				validator: function(value) {
					return ['left', 'right', 'up', 'down'].indexOf(value) !== -1;
				} 
			},
			attach: {
				type: Boolean,
				default: true
			},
			attachTo: {
				type: String,
				default: 'body'
			},
			sidebar: {
				type: Boolean
			},
			sidebarSize: {
				type: String,
				default: '3',
				validator: function(value) {
					return ['1', '2', '3'].indexOf(value) !== -1;
				} 
			},
			sidebarSizeXs: {
				type: String,
				default: '1',
				validator: function(value) {
					return ['1', '2', '3'].indexOf(value) !== -1;
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
				validator: function(value) {
					return ['small', 'large'].indexOf(value) !== -1;
				} 
			}
		},
		computed: {
			isFade: function() {
				return this.fade || this.slide || this.sidebar;
			},
			computedSlideDirection: function() {
				if (this.sidebar && ['left', 'right'].indexOf(this.slideDirection) === -1) {
					return 'left';
				}
				return this.slideDirection;
			},
			slideDirectionClass: function() {
				return 'slide-' + this.computedSlideDirection;
			},
			modal: function() {
				var obj = {
					'modal': true,
					'fade': this.isFade,
					'grow': this.grow,
					'modal-overlay': this.overlay
				};
				
				if (this.sidebar || this.slide)
					obj[this.slideDirectionClass] = true;

				if (this.backdrop)
					obj['modal-backdrop-' + this.backdrop] = true;

				if (this.panel)
					obj['modal-panel-default'] = true;

				return obj;
			},
			dialog: function() {
				var obj = {};

				if (this.sidebar) {
					obj['sidebar'] = true;
					obj[this.computedSlideDirection] = true;
					obj['sidebar-offset-0'] = true;
					obj['sidebar-size-' + this.sidebarSize] = true;
					obj['sidebar-size-xs-' + this.sidebarSizeXs] = true;
				}

				return obj;
			},
			content: function() {
				var obj = {
					'modal-sm': this.size == 'small',
					'h-center': this.size == 'small',
					'modal-lg': this.size == 'large'
				};
				return obj;
			}
		},
		methods: {
			showBackdrop: function () {
	        	if (this.backdrop) {
	            	$('body').addClass('modal-backdrop-' + this.backdrop);
	        	}
	        },
	        hideBackdrop: function () {
	        	if (this.backdrop) {
	            	$('body').removeClass('modal-backdrop-' + this.backdrop);
	        	}
	        }
		},
		ready: function() {
			if (this.attach && this.attachTo && $(this.attachTo).length) {
				$(this.$el).appendTo(this.attachTo);
			}
			$(this.$el)
				.on('show.bs.modal', this.showBackdrop)
		        .on('hidden.bs.modal', this.hideBackdrop);
		},
		beforeDestroy: function() {
			$(this.$el).remove();
		}
	}
</script>

<style lang="less">
	@import "~themekit-less/src/elements/modal";
</style>