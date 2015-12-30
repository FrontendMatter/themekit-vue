<script>
	import component from '../../src/vue/components/sidebar/sidebar.vue'
	import merge from 'mout/object/merge'

	let docsComponent = merge(component, {
		description: `
			Create a side navigation panel.

			## Requirements

			The sidebar component must be used with the [layout](#!/components/layout) or [layout transition](#!/components/layout-transition) components.

			## Layout sidebar slots

			To compose the layout with our sidebar and content, we must use content distribution slots. The \`slot\` is a special property that instructs the components on how to distribute content. Read more about [Content Distribution with Slots in Vue.js components](http://vuejs.org/guide/components.html#Content_Distribution_with_Slots)

			### sidebar

			The \`sidebar\` slot **is required** in any of the following cases:

			- when **using** the [layout](#!/components/layout) component
			- when **using** the [layout transition](#!/components/layout-transition) component and the sidebar \`effect\` property value is one of the following: \`reveal\`, \`slide-in\`, \`slide-along\`, \`slide-out-reverse\`, \`scale-down\`, \`scale-up\`, \`scale-rotate\`, \`open-door\`, \`fall-down\`

			### sidebar-push

			The \`sidebar-push\` slot **is required** when using the [layout transition](#!/components/layout-transition) component and the sidebar \`effect\` property value is one of the following: \`push\`, \`push-rotate\`, \`push-3d-rotate-in\`, \`push-3d-rotate-out\`, \`push-3d-rotate-delay\`
		`,
		props: {
			scrollable: {
				description: 'Make the sidebar content area scrollable.'
			},
			position: {
				description: 'Position the sidebar left or right.'
			},
			size: {
				description: 'Set the sidebar width to a fixed predefined size.'
			}
		}
	})

	export default docsComponent
</script>