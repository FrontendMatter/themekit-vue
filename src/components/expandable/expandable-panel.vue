<template>
	<div class="panel panel-default">
		<div class="panel-body expandable expandable-trigger" :class="expandableClass" v-on:click="toggle">
			<div class="expandable-content" :class="contentClass">
				<slot></slot>
				<div class="expandable-indicator" v-on:click.stop="toggle($event)" v-el:indicator><i></i></div>
			</div>
		</div>	
	</div>
</template>

<script>
	import Expandable from './expandable.vue'

	export default {
		mixins: [ Expandable ]
	}
</script>