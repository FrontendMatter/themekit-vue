<template>
	<div v-el:cover :class="coverClass">
		<img v-el:image :src="src" />
		<div :class="overlayClass">
			<div class="v-bottom">
	            <div class="container-fluid">
	                <div class="page-section">
	                    <h1 class="text-h1 text-overlay margin-v-0-10">{{ bannerTitle }}</h1>
	                    <p class="lead text-overlay">{{ bannerText }}</p>
	                </div>
	            </div>
	        </div>
        </div>
	</div>
</template>

<script>
	var Cover = require('./cover.vue');
	module.exports = {
		mixins: [ Cover ],
		props: {
			bannerTitle: {
				type: String
			},
			bannerText: {
				type: String
			},
			hover: {
				type: Boolean,
				default: false
			},
			overlayFull: {
				type: Boolean,
				default: false
			}
		}
	}
</script>