<template>
	<div class="tab-pane" :class="{ active: active }" :id="tabId">
		<template v-if="scrollable">
			<div v-scrollable>
				<slot></slot>
			</div>
		</template>
		<template v-else>
			<slot></slot>
		</template>
	</div>
</template>

<script>
	import randString from 'mout/random/randString'

	export default {
		props: {
			active: {
				type: Boolean
			},
			scrollable: {
				type: Boolean
			},
			icon: {
				type: String
			},
			label: {
				type: String,
				required: true
			},
			id: {
				type: String
			}
		},
		computed: {
			tabId () {
				return this.id ? this.id : `tab-${ randString() }`
			}
		},
		created () {
			this.$dispatch('tab-pane.tk.tabs', this)
		},
		events: {
			'shown.tk.tab': function (tabId) {
				if (this.tabId === tabId) {
					this.$broadcast('layout.tk.isotope', this)
				}
				return true
			}
		}
	}
</script>