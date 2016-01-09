<template>
	<div v-show="show" class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
		<div class="progress-bar progress-bar-success" :style="{ width: progress + '%' }"></div>
	</div>
</template>

<script>
	import DropzoneControl from './dropzone-control.vue'

	export default {
		data () {
			return {
				progress: 0
			}
		},
		mixins: [ DropzoneControl ],
		props: {
			control: {
				type: String,
				default: 'progress'
			}
		},
		methods: {
			onProgressQueueComplete () {
				this.progress = 0
				this.onQueueComplete()
			},
			onSending () {
				this.show = true
			},
			onTotalUploadProgress (progress) {
				this.progress = progress
			}
		},
		beforeDestroy () {
			if (this.dropzone) {
				this.dropzone.off('queuecomplete', this.onProgressQueueComplete)
				this.dropzone.off('sending', this.onSending)
				this.dropzone.off('totaluploadprogress', this.onTotalUploadProgress)
			}
		},
		events: {
			'control.tk.dropzone': function (data) {
				if (data.dropzoneId === this.dropzoneId) {
					this.show = false
					this.dropzone.on('queuecomplete', this.onProgressQueueComplete)
					this.dropzone.on('sending', this.onSending)
					this.dropzone.on('totaluploadprogress', this.onTotalUploadProgress)
				}
			}
		}
	}
</script>