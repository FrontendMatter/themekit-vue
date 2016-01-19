<template>
	<!-- Content -->
	<div class="container-fluid">
		<carousel :controls.sync="props.controls" :indicators.sync="props.indicators">
			
			<carousel-item	v-for="item in items" :active="item.active">
				<img :src="item.img" alt="..." class="img-responsive">
				<div class="carousel-caption">
					{{ item.title }}
				</div>
			</carousel-item>
			
		</carousel>

		<dropdown-settings>
			<carousel-settings :model.sync="props"></carousel-settings>
		</dropdown-settings>
	</div>
</template>
<script>
	import { CarouselItem } from 'themekit-vue'
	import { Carousel } from 'themekit-vue'
	const { DropdownSettings, CarouselSettings } = window.Util

	export default {
		data () {
			return {
				props: {},
				items: [
					{
						'active': true,
						'title': 'A descriptive title',
						'img': 'http://www.getmdl.io/templates/blog/images/bg_2880.jpg'
					},
					{
						'title': 'Another title not so descriptive',
						'img': 'http://www.getmdl.io/templates/blog/images/bg_2880.jpg'
					}
				]
			}
		},
		components: {
			Carousel,
			CarouselItem,
			DropdownSettings,
			CarouselSettings
		}
	}
</script>
<style>
	.carousel, .carousel-inner .item{
		max-width: 800px;
		max-height: 300px;
	}
</style>