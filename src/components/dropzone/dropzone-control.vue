<template>
	<button v-show="show" type="button" class="btn" :class="btnClass" @click.stop="handleControl">
        <i v-if="icon" :class="icon"></i>
        <span>{{ label }}</span>
    </button>
</template>

<script>
	import Dropzone from 'dropzone/dist/dropzone'

	export default {
		data () {
			return {
				show: true
			}
		},
		props: {
			label: {
				type: String,
				required: true
			},
			icon: {
				type: String
			},
			control: {
				type: String,
				required: true,
				validator (value) {
					return ['add', 'start', 'cancel'].indexOf(value) !== -1
				}
			},
			style: {
				type: String,
				default: 'default'
			},
			dropzoneId: {
				type: String,
				required: true
			}
		},
		computed: {
			btnClass () {
				var obj = {}
				obj['btn-' + this.style] = true
				return obj
			}
		},
		methods: {
			dispatchControl () {
				this.$dispatch('request-control.tk.dropzone', {
					dropzoneId: this.dropzoneId
				})
			},
			handleControl () {
				if (this.control === 'start') {
					return this.enqueueFiles()
				}
				if (this.control === 'cancel') {
					return this.removeFiles()
				}
				if (this.control === 'add') {
					return this.dropzone.hiddenFileInput.click()
				}
				alert('no handle')
			},
			enqueueFiles () {
				this.dropzone.enqueueFiles(this.dropzone.getFilesWithStatus(Dropzone.ADDED))
			},
			removeFiles () {
				this.dropzone.getFilesWithStatus(Dropzone.ADDED).forEach(function (file, index) {
					this.dropzone.removeFile(file)
				}.bind(this))
			},
			onAddedFile () {
				this.show = true
			},
			onRemovedFile () {
				if (!this.dropzone.getFilesWithStatus(Dropzone.ADDED).length) {
					this.show = false
				}
			},
			onQueueComplete () {
				this.show = false
			}
		},
		ready () {
			if (this.$parent.$options.name === 'dropzone') {
				this.isInsideDropzone = true
				this.dropzoneId = this.$parent.id
				this.dropzone = this.$parent.dropzone
				return
			}
			if (this.dropzoneId) {
				this.$nextTick(function () {
					this.dispatchControl()
				})
			}
		},
		beforeDestroy () {
			if (this.dropzone) {
				this.dropzone.off('addedfile', this.onAddedFile)
				this.dropzone.off('removedfile', this.onRemovedFile)
				this.dropzone.off('queuecomplete', this.onQueueComplete)
			}
		},
		events: {
			'control.tk.dropzone': function (data) {
				if (data.dropzoneId === this.dropzoneId) {
					this.dropzone = data.context.dropzone
					if (['start', 'cancel'].indexOf(this.control) !== -1) {
						this.show = false
						this.dropzone.on('addedfile', this.onAddedFile)
						this.dropzone.on('removedfile', this.onRemovedFile)
					}
					if (['start', 'cancel'].indexOf(this.control) !== -1) {
						this.dropzone.on('queuecomplete', this.onQueueComplete)
					}
				}
			}
		}
	}
</script>