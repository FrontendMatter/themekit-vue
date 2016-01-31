<template>
	<div class="alert" :class="alertNotificationClass" v-if="alertNotificationModel && !fixed">
		<partial name="alert"></partial>
	</div>
	<div class="alert" :class="alertNotificationClass" v-if="alertNotificationModel && fixed" v-transfer-dom>
		<partial name="alert"></partial>
	</div>
</template>

<script>
	export default {
		partials: {
			alert: `
				<button class="close" data-dismiss="alert">&times;</button>
				<template v-if="alertNotificationModel.type === 'error'">
					<h4>{{ alertNotificationErrorMsg }}</h4>
					<pre v-text="alertNotificationModel.message | json" class="m-b-0"></pre>
				</template>
				<template v-else>
					{{ alertNotificationModel.message }}
				</template>
			`
		},
		data () {
			return {
				alertNotificationModel: null,
				alertNotificationDebounce: null
			}
		},
		props: {
			timeout: {
				type: Boolean,
				default: true
			},
			timeoutDelay: {
				type: Number,
				default: 5000,
				coerce: function (val) {
					return Number(val)
				}
			},
			fixed: {
				type: Boolean
			}
		},
		computed: {
			alertNotificationClass () {
				return {
					'alert-notification': true,
					'alert-success': this.alertNotificationModel.type === 'success',
					'alert-danger': this.alertNotificationModel.type === 'error',
					'alert-warning': this.alertNotificationModel.type === 'warning',
					'alert-info': this.alertNotificationModel.type === 'info',
					'alert-default': !this.alertNotificationModel.type,
					'alert-notification-fixed': this.fixed
				}
			},
			alertNotificationErrorMsg () {
				return this.alertNotificationModel.message.message || 'Error'
			}
		},
		methods: {
			alertNotification (message, type, debounce) {
				clearTimeout(this.alertNotificationDebounce)
				const root = this.$root
				this.alertNotificationDebounce = setTimeout(() => {
					root.$broadcast('alert-notification', { message, type })
				}, debounce || 0)
			},
			alertNotificationSuccess (message, debounce) {
				this.alertNotification(message, 'success', debounce)
			},
			alertNotificationError (message, debounce) {
				this.alertNotification(message, 'error', debounce)
			},
			alertNotificationInfo (message, debounce) {
				this.alertNotification(message, 'info', debounce)
			}
		},
		destroyed () {
			clearTimeout(this.alertNotificationDebounce)
		},
		events: {
			'alert-notification': function (alert) {
				this.alertNotificationModel = alert
				
				if (alert.type !== 'error' && this.timeout) {
					setTimeout(() => {
						this.alertNotificationModel = null
					}, this.timeoutDelay)
				}
				return true
			}
		}
	}
</script>

<style lang="sass">
	@media (min-width: 768px) {
		.alert-notification-fixed {
			position: fixed;
			top: 20px;
			right: 20px;
			z-index: 1030;
			min-width: 250px;
		}
	}
</style>