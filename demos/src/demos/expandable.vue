<template>
	<div class="container-fluid">
		<!-- Isotope Layout -->
		<isotope>

			<!-- Grid Column -->
			<div class="col-sm-6 col-md-4 col-lg-3">
				<h4 class="page-section-heading">Example #1 (Small preview)</h4>

				<expandable>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus distinctio eaque, esse, id maxime modi, nam neque nihil qui quia quibusdam quis quisquam similique sunt totam veritatis. Ad autem consequatur cum delectus deleniti dolor dolores eius, eligendi error id nesciunt odit officia perferendis quasi recusandae similique tempora tenetur voluptas.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis dignissimos maiores nisi optio quas, quod? Animi fuga inventore laborum nemo quaerat quis quod? Alias, architecto consequuntur corporis deleniti dolor facilis id minima necessitatibus nihil perspiciatis quo repellendus saepe, sunt suscipit velit. Deleniti dolorum id maxime omnis perspiciatis sed, veniam?</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam autem doloribus iste nesciunt nihil nisi odio, optio temporibus. Alias dolore eveniet expedita neque nesciunt nihil qui reprehenderit repudiandae tempore? A consectetur ipsam magni quibusdam totam? At earum id incidunt iure labore libero, perferendis perspiciatis, saepe sed suscipit velit veritatis.</p>
				</expandable>

			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-sm-6 col-md-4 col-lg-3">
				<h4 class="page-section-heading">Example #2 (Large preview)</h4>

				<expandable content-size="large">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus distinctio eaque, esse, id maxime modi, nam neque nihil qui quia quibusdam quis quisquam similique sunt totam veritatis. Ad autem consequatur cum delectus deleniti dolor dolores eius, eligendi error id nesciunt odit officia perferendis quasi recusandae similique tempora tenetur voluptas.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis dignissimos maiores nisi optio quas, quod? Animi fuga inventore laborum nemo quaerat quis quod? Alias, architecto consequuntur corporis deleniti dolor facilis id minima necessitatibus nihil perspiciatis quo repellendus saepe, sunt suscipit velit. Deleniti dolorum id maxime omnis perspiciatis sed, veniam?</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam autem doloribus iste nesciunt nihil nisi odio, optio temporibus. Alias dolore eveniet expedita neque nesciunt nihil qui reprehenderit repudiandae tempore? A consectetur ipsam magni quibusdam totam? At earum id incidunt iure labore libero, perferendis perspiciatis, saepe sed suscipit velit veritatis.</p>
				</expandable>

			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-sm-6 col-md-4 col-lg-3">
				<h4 class="page-section-heading">Example #3 (Expandable on white background)</h4>

				<expandable-panel indicator-color="white">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus distinctio eaque, esse, id maxime modi, nam neque nihil qui quia quibusdam quis quisquam similique sunt totam veritatis. Ad autem consequatur cum delectus deleniti dolor dolores eius, eligendi error id nesciunt odit officia perferendis quasi recusandae similique tempora tenetur voluptas.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis dignissimos maiores nisi optio quas, quod? Animi fuga inventore laborum nemo quaerat quis quod? Alias, architecto consequuntur corporis deleniti dolor facilis id minima necessitatibus nihil perspiciatis quo repellendus saepe, sunt suscipit velit. Deleniti dolorum id maxime omnis perspiciatis sed, veniam?</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam autem doloribus iste nesciunt nihil nisi odio, optio temporibus. Alias dolore eveniet expedita neque nesciunt nihil qui reprehenderit repudiandae tempore? A consectetur ipsam magni quibusdam totam? At earum id incidunt iure labore libero, perferendis perspiciatis, saepe sed suscipit velit veritatis.</p>
				</expandable-panel>

			</div>
			<!-- // END Grid Column -->

			<!-- Grid Column -->
			<div class="col-sm-6 col-md-4 col-lg-3">
				<h4 class="page-section-heading">Example #4 (Expandable large on white background)</h4>
				
				<expandable-panel indicator-color="white" content-size="large">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus distinctio eaque, esse, id maxime modi, nam neque nihil qui quia quibusdam quis quisquam similique sunt totam veritatis. Ad autem consequatur cum delectus deleniti dolor dolores eius, eligendi error id nesciunt odit officia perferendis quasi recusandae similique tempora tenetur voluptas.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis dignissimos maiores nisi optio quas, quod? Animi fuga inventore laborum nemo quaerat quis quod? Alias, architecto consequuntur corporis deleniti dolor facilis id minima necessitatibus nihil perspiciatis quo repellendus saepe, sunt suscipit velit. Deleniti dolorum id maxime omnis perspiciatis sed, veniam?</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam autem doloribus iste nesciunt nihil nisi odio, optio temporibus. Alias dolore eveniet expedita neque nesciunt nihil qui reprehenderit repudiandae tempore? A consectetur ipsam magni quibusdam totam? At earum id incidunt iure labore libero, perferendis perspiciatis, saepe sed suscipit velit veritatis.</p>
				</expandable-panel>

			</div>
			<!-- // END Grid Column -->

		</isotope>
		<!-- // END Isotope Layout-->

	</div>
</template>

<script>
	import { Expandable } from 'themekit-vue'
	import { ExpandablePanel } from 'themekit-vue'
	import { Isotope } from 'themekit-vue'

	export default {
		components: {
			Expandable,
			ExpandablePanel,
			Isotope
		}
	}
</script>