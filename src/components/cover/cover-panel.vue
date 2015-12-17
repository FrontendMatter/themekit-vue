<template>
	<div class="panel panel-default">     
        <slot></slot>
        <div class="panel-body">
            <h4 class="margin-none"><a href="">{{ panelTitle }}</a></h4>
            <span class="text-grey-500">{{ panelCaption }}</span>
        </div>
    </div>
</template>

<script>
	module.exports = {
		props: {
			panelTitle: {
				type: String,
				default: 'Panel Title'
			},
			panelCaption: {
				type: String,
				default: 'Panel Caption'
			}
		}
	}
</script>