<template>
	<dropdown :class="class">
		<partial name="toggle"></partial>
		<div class="dropdown-menu" :class="dropdownMenuClass" @click.stop>
			<partial name="dropdown-menu-content"></partial>
		</div>
	</dropdown>
</template>
<script>
	import Dropdown from './dropdown.vue'

	export default {
		partials: {
			toggle: `
				<a href="#" @click.prevent :class="btnClass">
					<i class="dropdown-menu-icon" v-if="icon" :class="icon"></i>
					<span>{{ label }}</span>
				</a>
			`,
			dropdownMenuContent: `
				<div v-if="header" class="dropdown-header">{{ header }}</div>
				<template v-if="height">
					<div v-scrollable :style="scrollHeight">
						<slot></slot>
					</div>
				</template>
				<template v-else>
					<slot></slot>
				</template>
				<slot name="footer">
					<div v-if="footer">
						{{ footer }}
					</div>
				</slot>	
			`
		},
		props: {
			label: {
				type: String,
				required: true
			},
			icon: {
				type: String
			},
			btnClass: {
				type: String
			},
			class: {
				type: String
			},
			dropdownMenuClass: {
				type: String
			},
			height: {
				type: Number
			},
			header: {
				type: String
			},
			footer: {
				type: String
			}
		},
		components: {
			Dropdown
		},
		computed: {
			scrollHeight () {
				if (this.height) {
					return { maxHeight: `${this.height}px`}
				}
			}
		}
	}
</script>

<style lang="sass">
	@import "../sass/dropdown/dropdown-menu";
</style>