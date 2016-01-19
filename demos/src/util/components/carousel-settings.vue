<template>
	<div class="row">
		<div class="col-md-3">
			<label>Controls:</label>
			<div class="checkbox">
				<label for="carousel-controls">
					<input id="carousel-controls" type="checkbox" v-model="model.controls" /> Yes
				</label>
			</div>
		</div>
		<div class="col-md-3">
			<label>Indicators:</label>
			<div class="checkbox">
				<label for="carousel-indicators">
					<input id="carousel-indicators" type="checkbox" v-model="model.indicators" /> Yes
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	import merge from 'mout/object/merge'

	export default {
		data () {
			return {
				settings: {
					controls: true,
					indicators: true
				}
			}
		},
		props: {
			model: {
				type: Object
			}
		},
		created () {
			if (this.model) {
				this.model = merge(this.settings, this.model)
			}
		}
	}
</script>