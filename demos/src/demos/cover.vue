<template>
	<!-- Content -->
	<div>
		<!-- Cover -->
		<div class="relative overflow-hidden max-width-1000 h-center">
			<cover-banner
				class="max-height-700 height-550-xs" 
				src="http://www.getmdl.io/templates/blog/images/bg_2880.jpg"
				banner-title="Light text cover"
				banner-text="When using dark color based images, we need light text color overlay and light text color top-level nav items."
				overlay-bg="black">
				something cool
			</cover-banner>
		</div>
		</cover>
	</div>
</template>
<script>
	import { CoverBanner } from 'themekit-vue' 

	export default {
		components: {
			CoverBanner
		}
	}
</script>
<style>
	.cover {
		margin:0;
	}
</style>