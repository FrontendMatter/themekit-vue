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
	import shortid from 'shortid'

	export default {
		data () {
			return {
				tabId: shortid.generate()
			}
		},
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
			}
		},
		created () {
			this.$dispatch('tab-pane.tk.tabs', this)
		}
	}
</script>