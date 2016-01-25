<template>
	<div class="container-fluid">
		<h1>TODO: NEEDS FIXED</h1>
		<div class="page-section page-section-alt">
			<!-- Dropzone -->
			<dropzone
				:files="simpleFiles" 
				action="http://upload-demo.aws.ipv4.ro/upload">
			</dropzone>
		</div>

		<!-- Isotope Layout -->
		<isotope>

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Dropzone Panel</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone 
					style="panel"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Dropzone Dashed</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone
					style="panel dashed"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Primary Border</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone
					style="panel dashed primary"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Primary Background</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone
					style="panel primary fill"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Default Icon</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone
					style="panel dashed"
					icon="md md-cloud-upload"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Icon Color</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone
					style="panel dashed"
					icon="md md-cloud-upload text-grey-400"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Icon Color</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone
					style="panel dashed primary"
					icon="md md-cloud-upload text-primary"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-lg-3 col-md-4 col-sm-6">
				<div class="page-section text-center">
					<h4>Icon Color</h4>
				</div>
						
				<!-- Dropzone -->
				<dropzone
					style="panel fill primary"
					icon="md md-cloud-upload"
					action="http://upload-demo.aws.ipv4.ro/upload">
				</dropzone>
			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-md-6 col-xl-4 col-xxl-3">
				<div class="page-section text-center">
					<h4>Upload Controls</h4>
				</div>
				<div class="panel panel-default">
					<div class="panel-body">

						<!-- Dropzone Controls Container -->
						<div class="dropzone-controls">

							<!-- Dropzone Control -->
							<dropzone-control
								dropzone-id="dz-controls"
								control="add"
								style="success"
								label="Add files"
								icon="glyphicons glyphicons-plus">
							</dropzone-control>
							<!-- // END Dropzone Control -->

							<!-- Dropzone Control -->
							<dropzone-control
								dropzone-id="dz-controls"
								control="start"
								style="primary"
								label="Start"
								icon="glyphicons glyphicons-upload">
							</dropzone-control>
							<!-- // END Dropzone Control -->

							<!-- Dropzone Control -->
							<dropzone-control
								dropzone-id="dz-controls"
								control="cancel"
								style="warning"
								label="Cancel"
								icon="glyphicons glyphicons-ban-circle">
							</dropzone-control>
							<!-- // END Dropzone Control -->

						</div>
						<!-- // END Dropzone Controls -->

						<dropzone-control-progress 
							class="margin-v-10-0"
							dropzone-id="dz-controls">
						</dropzone-control-progress>

					</div>
					<hr>
					<div class="panel-body">

						<!-- Dropzone -->
						<dropzone v-el:dz
							dropzone-id="dz-controls"
							style="panel dashed"
							:auto-queue="false"
							:files="files"
							action="http://upload-demo.aws.ipv4.ro/upload">
						</dropzone>
						<!-- // END Dropzone -->

					</div>
				</div>
			</div>
			<!-- // END Grid Column -->

		</isotope>
		<!-- // END Isotope Layout -->

	</div>
</template>

<script>
	import { Isotope } from 'themekit-vue'
	import { Dropzone } from 'themekit-vue'
	import { DropzoneControl } from 'themekit-vue'
	import { DropzoneControlProgress } from 'themekit-vue'

	export default {
		data () {
			return {
				simpleFiles: []
			}
		},
		components: {
			Isotope,
			Dropzone,
			DropzoneControl,
			DropzoneControlProgress
		}
	}
</script>