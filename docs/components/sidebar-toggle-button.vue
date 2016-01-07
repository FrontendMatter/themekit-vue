<script>
	import component from 'themekit-vue/src/components/sidebar-toggle-button'
	import merge from 'mout/object/merge'

	let docs = merge(component, {
		description: `Create a button to toggle the visibility for the [sidebar](#!/components/sidebar) and [sidebar-transition](#!/components/sidebar-transition) components.`,
		props: {
			sidebarId: {
				description: `Must match the \`sidebar-id\` property value of the corresponding [sidebar](#!/components/sidebar) or [sidebar-transition](#!/components/sidebar-transition) component.`
			},
			icon: {
				description: `Provide a class name to add a button icon.`
			},
			label: {
				description: `Provide the text for the button.`
			}
		}
	})

	export default docs
</script>