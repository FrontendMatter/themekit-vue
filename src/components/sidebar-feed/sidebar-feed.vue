<template>
	<template v-if="items.length">
		<sidebar-block :heading="heading">
			<div class="sidebar-feed">
				<ul>
					<li class="media news-item" v-for="item in items">
						<span v-if="item.unread" class="news-item-success pull-right"><i class="fa fa-circle"></i></span>
						<span class="pull-left media-object">
							<i class="{{ icon }}"></i>
						</span>
						<div class="media-body">
							<a href="">{{ item.user }}</a> {{ item.action }}
							<span class="time">{{ item.time }}</span>
						</div>
					</li>
				</ul>
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

<style lang="less">
	@import "~themekit-less/src/sidebar-elements/sidebar-feed";
</style>