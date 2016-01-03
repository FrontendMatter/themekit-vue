<script>
	import 'load_image/load_image'

	export default {
		name: 'cover',
		data () {
			return {
				layoutTimer: null
			}
		},
		methods: {
			/**
			 * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
			 * images to fit into a certain area.
			 *
			 * @param {Number} srcWidth Source area width
			 * @param {Number} srcHeight Source area height
			 * @param {Number} maxWidth Fittable area maximum available width
			 * @param {Number} maxHeight Fittable area maximum available height
			 * @return {Object} { width, heigth }
			 */
			aspectRatioFit (srcWidth, srcHeight, maxWidth, maxHeight) {

				var wRatio = maxWidth / srcWidth
				var hRatio = maxHeight / srcHeight
				var width = srcWidth
				var height = srcHeight

				if (srcWidth / maxWidth < srcHeight / maxHeight) {
					width = maxWidth
					height = srcHeight * wRatio
				} 
				else {
					width = srcWidth * hRatio
					height = maxHeight
				}

				return { width: width, height: height }
			},
			cover () {
				var self = this
				var img = $(this.$els.image)
				if (!img) return

				var cover = $(this.$els.cover)

				// select all overlays
				var overlay = cover.find('> .overlay')

				// filter only the overlays that should have the full height of the cover container
				var overlayFull = overlay.filter(function () {
					return $(this).is('.overlay-hover') || $(this).is('.overlay-full')
				})

				// reset the cover height
				cover.removeAttr('style')

				// reset overlays height
				if (img.is('img')) {
					overlay.css('height', 'auto')
				}

				var bodyPadding = {
					top: parseInt($(document.body).css('padding-top'), 10),
					bottom: parseInt($(document.body).css('padding-bottom'), 10)
				}
				var $contentScrollable = $('.st-content-inner')
				var $scrollable = $contentScrollable.length ? $contentScrollable : $(window)
				var wHeight = $scrollable.innerHeight() - (bodyPadding.top + bodyPadding.bottom)
				var changed = false
				var oWidth
				var oHeight

				if (!cover.is('[class*="height"]')) {

					var tHeight = cover.height()

					// store the current image sizes
					oWidth = img.width()
					oHeight = img.height()

					// reset image style
					img.removeAttr('style')

					// the new image height
					var height = img.height()

					// cover overlay sizes
					if (overlay.length) {
						var overlayHeight = overlay.innerHeight()

						// if the overlay is taller than the cover container
						// increase the cover container height to the overlay's height
						if (overlayHeight > height) {
							height = overlayHeight
						}

						// if the overlay is overlay-hover or overlay-full
						// make sure the overlay is equally tall with the cover image
						if (overlay.is('.overlay-hover') || overlay.is('.overlay-full')) {
							height = img.height()
						}
					}

					// make sure the cover is never taller than the visible viewport
					if (height > wHeight) {
						height = wHeight
					}

					// set the overlay height
					if (overlay.length) {
						overlayFull.innerHeight(height)
					}

					// set the cover height
					cover.height(height)

					// set the image sizes
					img.css(self.aspectRatioFit(img.width(), img.height(), cover.width(), cover.height()))

					// test for the cover or images sizes changes
					changed = tHeight !== cover.height()
					if (!changed) {
						changed = (oWidth !== img.width() || oHeight !== img.height())
					}

					// notify other components about size changes
					if (changed) {
						self.$dispatch('layout.tk.isotope', self)
					}
				}
				else {

					// make sure the cover is never taller than the visible viewport
					if (cover.height() > wHeight) {
						cover.height(wHeight)
					}

					oWidth = img.width()
					oHeight = img.height()

					img.removeAttr('style')
					img.css(self.aspectRatioFit(img.width(), img.height(), cover.width(), cover.height()))

					changed = (oWidth !== img.width() || oHeight !== img.height())
					if (changed) {
						self.$dispatch('layout.tk.isotope', self)
					}
				}
			},
			initCover () {
				var img = $(this.$els.image)
				if (!img) { 
					return this.cover()
				}
				$.loadImage(img.attr('src')).done(function (image) {
					this.cover()
				}.bind(this))
			},
			handleCover () {
				clearTimeout(this.layoutTimer)
				this.layoutTimer = setTimeout(this.cover, 10)
			}
		},
		ready () {
			this.initCover()
			window.addEventListener('resize', this.handleCover)
		},
		events: {
			'layout.tk.isotope': function () {
				this.handleCover()
			}
		},
		beforeDestroy () {
			window.removeEventListener('resize', this.handleCover)
		},
		computed: {
			coverClass () {
				return {
					'cover': true,
					'overlay': true,
					'hover': this.hover, 
					'cover-image-full': this.imageFull
				}
			},
			overlayClass () {
				var classes = { 
					'overlay': true,
					'overlay-full': this.overlayFull, 
					'overlay-hover': this.hover 
				}
				if (this.overlayBg) {
					classes['overlay-bg-' + this.overlayBg] = true
				}
				return classes
			}
		},
		props: {
			src: {
				type: String,
				required: true
			},
			hover: {
				type: Boolean,
				default: true
			},
			imageFull: {
				type: Boolean,
				default: true
			},
			overlayFull: {
				type: Boolean,
				default: true
			},
			overlayBg: {
				type: String,
				default: 'white-strong'
			}
		}
	}
</script>

<style lang="sass">
	@import "../sass/cover/cover";
</style>