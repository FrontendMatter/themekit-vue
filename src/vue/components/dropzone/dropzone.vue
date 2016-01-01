<template>
	<div :id="id" class="dropzone" :class="dropzoneClass">
		<div class="dz-message">
			<i v-if="icon" class="dz-icon" :class="icon"></i>
			<div v-if="messageWrapper" class="dz-message-wrapper">
				<h4>{{ title }}</h4>
				<span v-if="note" class="note">{{ noteContent }}</span>
			</div>
			<template v-else>
				<h4>{{ title }}</h4>
				<span v-if="note" class="note">{{ noteContent }}</span>
			</template>
		</div>
		<div class="dropzone-previews" v-el:dropzone-previews></div>
	</div>
</template>

<script>
	import Dropzone from 'dropzone/dist/dropzone'
	import shortid from 'shortid'

	Dropzone.autoDiscover = false

	export default {
		data () {
			return {
				requests: []
			}
		},
		props: {
			action: {
				type: String,
				required: true
			},
			title: {
				type: String,
				default: 'Drop files here or click to upload.'
			},
			note: {
				type: Boolean,
				default: true
			},
			noteContent: {
				type: String,
				default: 'Your files will be uploaded but not saved on the server.'
			},
			icon: {
				type: String
			},
			autoQueue: {
				type: Boolean,
				default: true
			},
			style: {
				type: String,
				validator (value) {
					var defaults = ['panel', 'dashed', 'primary', 'fill']
					var values = value.split(' ')
					return values.filter(v => defaults.indexOf(v) !== -1).length === values.length
				}
			},
			dropzoneId: {
				type: String
			},
			files: {
				type: Array,
				default () {
					return []
				}
			}
		},
		computed: {
			id () {
				if (this.dropzoneId) {
					return this.dropzoneId
				}
				return 'dropzone-' + shortid.generate()
			},
			dropzoneClass () {
				var classes = {}
				if (this.style) {
					this.style.split(' ').forEach(function (className) {
						classes['dropzone-' + className] = true
					})
				}
				return classes
			},
			options () {
				return {
					url: this.action,
					autoQueue: this.autoQueue,
					previewsContainer: this.$els.dropzonePreviews
				}
			}
		},
		methods: {
			broadcast () {
				var self = this
				this.$root.$broadcast('control.tk.dropzone', { 
					context: self, 
					dropzoneId: self.id
				})
			},
			updateLayout () {
				this.$dispatch('layout.tk.isotope', this)
			}
		},
		ready () {
			this.dropzone = new Dropzone(this.$el, this.options)
			const events = ['addedfile', 'removedfile', 'complete', 'sending', 'queuecomplete']
			events.forEach(function (eventName) {
				this.dropzone.on(eventName, this.updateLayout)
			}, this)

			this.files.forEach(function (file) {
				// Call the default addedfile event handler
				this.dropzone.emit('addedfile', file)

				// And optionally show the thumbnail of the file:
				if (typeof file[ 'thumbnail' ] !== 'undefined') {
					this.dropzone.emit('thumbnail', file, file.thumbnail)
				}

				// Make sure that there is no progress bar, etc...
				this.dropzone.emit('complete', file)
			}, this)
			
			var self = this
			this.$root.$on('request-control.tk.dropzone', function (data) {
				if (self.id === data.dropzoneId) {
					self.broadcast()
				}
			})
			this.broadcast()
			this.$dispatch('ready.tk.dropzone', this)
		},
		beforeDestroy () {
			this.dropzone.destroy()
		}
	}
</script>

<style lang="sass">
	@import "../../../sass/elements/dropzone";
</style>