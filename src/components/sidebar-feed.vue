<template>
	<template v-if="items.length">
		<h4 class="sidebar-category" v-if="heading">{{ heading }}</h4>
		<div class="sidebar-block">
			<div class="sidebar-feed">
				<div class="media sidebar-feed-item sidebar-feed-unread" v-for="item in model">
					<span v-if="item.unread" class="sidebar-feed-status pull-right">
						<i class="fa fa-circle"></i>
					</span>
					<span v-if="icon" class="pull-left">
						<i class="{{ icon }}"></i>
					</span>
					<div class="media-body">
						<a v-link="item.user.route">{{ item.user.name }}</a> {{ item.action }}
						<span class="time">{{ item.time }}</span>
					</div>
				</div>
			</div>
		</div>
	</template>
</template>

<script>
	export default {
		props: {
			heading: {
				type: String
			},
			icon: {
				type: String,
				default: 'fa fa-fw fa-bell'
			},
			model: {
				type: Array
			}
		}
	}
</script>

<style lang="sass">
	@import "../sass/sidebar-elements/sidebar-feed";
</style>