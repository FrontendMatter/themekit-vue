<template>
	<template v-if="items.length">
		<sidebar-block :heading="heading">
			<div class="sidebar-feed">
				<div class="media sidebar-feed-item sidebar-feed-unread" v-for="item in items">
					<span v-if="item.unread" class="sidebar-feed-status pull-right">
						<i class="fa fa-circle"></i>
					</span>
					<span v-if="icon" class="pull-left">
						<i class="{{ icon }}"></i>
					</span>
					<div class="media-body">
						<a href="">{{ item.user }}</a> {{ item.action }}
						<span class="time">{{ item.time }}</span>
					</div>
				</div>
			</div>
		</sidebar-block>
	</template>
	<slot></slot>
</template>

<script>
	import SidebarBlock from '../sidebar-block/sidebar-block.vue'
	
	export default {
		data () {
			return {
				items: []
			}
		},
		props: {
			heading: {
				type: String
			},
			icon: {
				type: String,
				default: 'fa fa-fw fa-bell'
			}
		},
		events: {
			'item.tk.sidebar-feed': function (item) {
				this.items.push(item)
			}
		},
		components: {
			SidebarBlock
		}
	}
</script>

<style lang="sass">
	@import "../../../sass/sidebar-elements/sidebar-feed";
</style>