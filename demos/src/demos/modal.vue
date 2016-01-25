<template>
	<div class="page-section">
		<div class="row">
			<div class="col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">

				<h4 class="page-section-heading">Animations &amp; Positioning</h4>
				<div class="row">
					<div class="col-md-6 col-xs-12">
						<div class="panel panel-default text-center">
							<div class="panel-body">

								<!-- Toggle Button -->
								<button data-toggle="modal" data-target="#modal-slide-down" class="btn btn-primary">Slide down</button>

								<!-- Modal -->
								<modal slide 
									slide-direction="down"
									id="modal-slide-down">
								</modal>

							</div>
						</div>
					</div>
					<div class="col-md-6 col-xs-12">
						<div class="panel panel-default text-center">
							<div class="panel-body">

								<!-- Toggle Button -->
								<button data-toggle="modal" data-target="#modal-slide-up" class="btn btn-primary">Slide up</button>

								<!-- Modal -->
								<modal slide 
									slide-direction="up"
									id="modal-slide-up">
								</modal>

							</div>
						</div>
					</div>
				</div>

				<h4 class="page-section-heading">Standard Bootstrap modals as sidebars</h4>
				<div class="row">
					<div class="col-md-6 col-xs-12">
						<div class="panel panel-default text-center">
							<div class="panel-body">
								
								<!-- Toggle Button -->
								<button data-toggle="modal" data-target="#modal-slide-left" class="btn btn-primary">Slide left</button>

								<!-- Modal -->
								<modal sidebar id="modal-slide-left"></modal>

							</div>
						</div>
					</div>
					<div class="col-md-6 col-xs-12">
						<div class="panel panel-default text-center">
							<div class="panel-body">
								
								<!-- Toggle Button -->
								<button data-toggle="modal" data-target="#modal-slide-right" class="btn btn-primary">Slide right</button>

								<!-- Modal -->
								<modal sidebar 
									slide-direction="right" 
									id="modal-slide-right">
								</modal>

							</div>
						</div>
					</div>
				</div>

				<h4 class="page-section-heading">Grow: Modal Overlay, Panel Style &amp; Backdrop colors</h4>
				<div class="panel panel-default text-center max-width-350 h-center">
					<div class="panel-body buttons-spacing-vertical">

						<!-- Toggle Buttons -->
						<button data-toggle="modal" data-target="#modal-grow-overlay-white" class="btn btn-primary">Modal Overlay + White backdrop</button>
						<button data-toggle="modal" data-target="#modal-grow-panel-body" class="btn btn-primary">Modal Panel + Body backdrop</button>

						<!-- Modal Overlay + Grow + White backdrop -->
						<modal grow overlay 
							backdrop="white" 
							id="modal-grow-overlay-white">
						</modal>
						
						<!-- Modal Panel + Grow + Body backdrop color -->
						<modal grow panel 
							backdrop="body" 
							id="modal-grow-panel-body">
						</modal>
						
					</div>
				</div>

				<h4 class="page-section-heading">Modal Sizes</h4>
				<div class="panel panel-default text-center max-width-350 h-center">
					<div class="panel-body">

						<!-- Toggle Buttons -->
						<button data-toggle="modal" data-target="#modal-size-small" class="btn btn-primary">Small</button>
						<button data-toggle="modal" data-target="#modal-size-large" class="btn btn-primary">Large</button>

						<!-- Modal -->
						<modal size="small" slide id="modal-size-small"></modal>
						<modal size="large" slide id="modal-size-large"></modal>

					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { Modal } from 'themekit-vue'
	export default {
		components: {
			Modal
		}
	}
</script>