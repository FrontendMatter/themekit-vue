<template>
	<div class="panel panel-default">
		<div class="panel-body expandable expandable-trigger" :class="expandableClass" @click="toggle">
			<div class="expandable-content" :class="contentClass">
				<slot></slot>
				<div class="expandable-indicator" @click.stop="toggle($event)" v-el:indicator><i></i></div>
			</div>
		</div>	
	</div>
</template>

<script>
	var Expandable = Object.create(require('./expandable.vue'));
	module.exports = {
		mixins: [ Expandable ]
	}
</script>