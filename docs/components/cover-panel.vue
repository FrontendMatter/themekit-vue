<script>
	import component from 'themekit-vue/src/components/cover-panel'
	import merge from 'mout/object/merge'

	let docs = merge(component, {
		description: `Wrap a [cover](#!/components/cover) component into a panel.`,
		props: {
			panelTitle: {
				description: `Set a panel title text.`
			},
			panelCaption: {
				description: `Set a panel caption text.`
			}
		}
	})

	export default docs
</script>