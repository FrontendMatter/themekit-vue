<template>
	<dropdown class="form-group" v-el:dropdown 
		@closed.tk.dropdown="searchValue=null">
		<partial name="search"></partial>
		<partial name="results"></partial>
	</dropdown>
</template>

<script>
	import randString from 'mout/random/randString'
	import Dropdown from './dropdown'

	export default {
		partials: {
			search: `
				<input type="text" 
					:id="searchBoxId"
					:placeholder="placeholder"
					class="form-control"
					v-model="searchValue"
					:debounce="debounce"
					aria-haspopup="true" />
			`,
			results: `
				<ul class="search-dd dropdown-menu" role="listbox">	
					<template v-for="result in results">
						<template v-if="result.hits.length > 0">
							<li class="dropdown-header" v-if="result.indice.label">{{ result.indice.label }}</li>
							<partial name="hits"></partial>
						</template>
					</template>
				</ul>
			`,
			hits: `
				<li class="dropdown" v-for="hit in result.hits" aria-role="option" v-link-active>
					<partial name="hit"></partial>
				</li>
			`,
			hit: `
				<a class="dropdown-menu-button search-dd-hit" v-link="hit.route">
					<i class="dropdown-menu-icon" v-if="hit.icon" :class="hit.icon"></i>
					<span class="search-dd-hit-label">{{ hit.label }}</span>
					<span class="search-dd-hit-description" v-if="hit.description">{{ hit.description }}</span>
				</a>
			`
		},
		data () {
			return {
				searchValue: null
			}
		},
		props: {
			placeholder: {
				type: String,
				default: 'Search ...'
			},
			debounce: {
				type: Number,
				default: 300
			},
			results: {
				type: Array,
				default () {
					return []
				}
			}
		},
		computed: {
			searchBoxId () {
				return `search-box-${ randString() }`
			},
			searchBox () {
				return document.querySelector(`#${ this.searchBoxId }`)
			},
			dropdown () {
				return this.$els.dropdown
			}
		},
		methods: {
			keydown (e) {
				const keys = [38, 40, 27]
				if (keys.indexOf(e.which) === -1) {
					return
				}

				e.preventDefault()
				e.stopPropagation()

				const KEY_UP = e.which === 38
				const KEY_DOWN = e.which === 40
				const KEY_ESC = e.which === 27

				const isOpen = this.searchValue
				const parent = this.dropdown

				let items = $.makeArray(
					parent.querySelectorAll('li:not(.disabled) .search-dd-hit')
				)
				.filter((item) => {
					return item.offsetWidth || item.offsetHeight
				})

				if (!isOpen && !KEY_ESC || isOpen && KEY_ESC) {
					if (KEY_ESC) {
						e.target.focus()
					}
					this.searchValue = null
					return
				}

				if (!items.length) {
					return
				}

				let index = items.indexOf(e.target)
				if (KEY_UP && index === 0) {
					index = items.length
				}
				if (KEY_UP && index > 0) {
					index-- 
				}
				if (KEY_DOWN && index === items.length - 1) {
					index = 0
				}
				else if ((KEY_DOWN) && index < items.length - 1) {
					index++
				}
				if (index < 0) {
					index = 0
				}
				items[index].focus()
			},
			openDropdown () {
				this.$broadcast('open.tk.dropdown')
			},
			closeDropdown () {
				this.$broadcast('close.tk.dropdown', null, true)
			}
		},
		ready () {
			this.searchBox.addEventListener('keydown', this.keydown)
			this.dropdown.querySelector('[role="listbox"]').addEventListener('keydown', this.keydown)
		},
		beforeDestroy () {
			this.searchBox.removeEventListener('keydown', this.keydown)
			this.dropdown.querySelector('[role="listbox"]').removeEventListener('keydown', this.keydown)
		},
		watch: {
			searchValue (value) {
				if (value) {
					this.openDropdown()
					this.searchBox.setAttribute('aria-expanded', 'true')
				}
				else {
					this.closeDropdown()
					this.searchBox.setAttribute('aria-expanded', 'false')
				}
			}
		},
		components: {
			Dropdown
		}
	}
</script>

<style>
	.search-dd {
		min-width: 250px;
		max-width: 300px;
	}
	.search-dd-hit {
		white-space: normal !important;
	}
	.search-dd-hit-label {
		font-weight: 500;
	}
	.search-dd-hit-description {
		display: block;
		font-weight: normal;
	}
</style>