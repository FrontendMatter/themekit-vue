<script>
	import component from '../../../../src/components/sidebar.vue'
	import merge from 'mout/object/merge'

	let docs = merge(component, {
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
				description: `Make the sidebar content area scrollable.`
			},
			position: {
				description: `Position the sidebar left or right.`
			},
			size: {
				description: `
					Set the sidebar width to a fixed predefined size. The value should be \`1\` for \`56px\`, \`2\` for \`200px\` and \`3\` for \`250px\`.
				`
			},
			sizeXs: {
				description: `Set the sidebar width for screens up to \`768px\`.`
			},
			sizeSm: {
				description: `Set the sidebar width for screens between \`768px\` and \`992px\`.`
			},
			sizeMd: {
				description: `Set the sidebar width for screens **>=** than \`992px\`.`
			},
			sizeLg: {
				description: `Set the sidebar width for screens **>=** than \`1200px\`.`
			},
			visible: {
				description: `
					Enable the sidebar visibility on any screen size, on specific screen sizes or screen size range. Accepts the following values **in any combination**: \`xs\`, \`sm\`, \`md\`, \`lg\` and \`xs-up\`, \`sm-up\`, \`md-up\`, \`lg-up\`

					##### default: \`sm-up\`
				`
			},
			offset: {
				description: `
					Offset or move the sidebar to the opposite direction of it's position, in order to make room for another sidebar element on the same side. Only required when using more than 1 sidebar on the same side.

					#### Offset Example

					##### Scenario:

					- we have 2 sidebar elements on the page, sidebar A and sidebar B
					- sidebar A has the size property value of \`1\` (\`56px\`) and the \`sidebar-id\` property value of \`sidebar-A\`
					- sidebar B has the size property value of \`2\` (\`200px\`)
					- both sidebars are positioned on the left
					- we want sidebar B to be placed next to sidebar A, to the right

					##### Usage:

					- sidebar B will have the offset property value of \`sidebar-A\`, which is the \`sidebar-id\` property value of sidebar A
				`
			},
			toggleBar: {
				description: `Display a vertical toggle bar along the sidebar element.`
			},
			sidebarId: {
				description: `Assign a unique identifier for the sidebar element.`
			},
			show: {
				description: `Control the visibility of the sidebar element on the initial page load.`
			}
		}
	})

	export default docs
</script>