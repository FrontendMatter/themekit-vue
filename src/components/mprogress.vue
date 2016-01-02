<template>
	<div :class="progress" :id="id"></div>
</template>

<script>
	import shortid from 'shortid'
	import 'mprogress/build/css/mprogress.css'
	import Mprogress from 'mprogress/build/js/mprogress'

	export default {
		data () {
			return {
				id: 'mprogress-' + shortid.generate(),
				mp: null
			}
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			bufferValue: {
				type: Number,
				default: 0
			},
			type: {
				type: String,
				default: 'determinate',
				validator (value) {
					return ['determinate', 'indeterminate', 'buffer'].indexOf(value) !== -1
				}
			},
			color: {
				type: String
			},
			mini: {
				type: Boolean
			}
		},
		computed: {
			template () {
				if (this.type === 'determinate') {
					return 1
				} 
				else if (this.type === 'indeterminate') {
					return 3
				} 
				else if (this.type === 'buffer') {
					return 2
				}
			},
			progress () {
				var obj = {
					'mprogress': true,
					'mprogress-mini': this.mini
				}
				obj['mprogress-' + this.type] = true
				if (this.color) {
					obj['mprogress-' + this.color] = true
				}
				return obj
			}
		},
		ready () {
			this.mp = new Mprogress({
				template: this.template,
				parent: '#' + this.id
			})
			this.mp.set(this.value)
		},
		watch: {
			value (value) {
				this.mp.set(value)
			},
			bufferValue (value) {
				this.mp.setBuffer(value)
			}
		}
	}
</script>

<style lang="sass">
	@import "../sass/elements/mprogress";
</style>