<template>
	<div class="row">
		<div class="col-md-3">
			<label>Position:</label>
			<div class="radio">
				<label for="position-left">
					<input id="position-left" type="radio" value="left" v-model="model.position" /> Left
				</label>
			</div>
			<div class="radio">
				<label for="position-right">
					<input id="position-right" type="radio" value="right" v-model="model.position" /> Right
				</label>
			</div>
		</div>
		<div class="col-md-3">
			<label>Size:</label>
			<div class="radio">
				<label for="sc-size-1">
					<input id="sc-size-1" type="radio" value="1" v-model="model.size" /> 56px
				</label>
			</div>
			<div class="radio">
				<label for="sc-size-2">
					<input id="sc-size-2" type="radio" value="2" v-model="model.size" /> 200px
				</label>
			</div>
			<div class="radio">
				<label for="sc-size-3">
					<input id="sc-size-3" type="radio" value="3" v-model="model.size" /> 250px
				</label>
			</div>
		</div>
		<div class="col-md-3">
			<label>Mini:</label>
			<div class="checkbox">
				<label for="sc-mini">
					<input id="sc-mini" type="checkbox" v-model="model.mini" /> Yes
				</label>
			</div>
		</div>
		<div class="col-md-3">
			<label>Reveal:</label>
			<div class="checkbox">
				<label for="sc-mini-reveal">
					<input id="sc-mini-reveal" type="checkbox" v-model="model.reveal" /> Yes
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
					position: 'left',
					size: '2',
					mini: false,
					reveal: false
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