require('simplebar/src/simplebar')

export default {
	params: {
		horizontal: {
			type: Boolean
		}
	},
	bind () {
		$(this.el).addClass('simplebar')
		if (this.params.horizontal) {
			$(this.el).addClass('horizontal')
		}
		var vm = this.vm
		$(this.el).simplebar({
			autoHide: false
		})
		$(this.el).simplebar().on('scroll', function () {
			var scrollable = $(this)
			let scrollTop = scrollable.simplebar('getScrollElement').scrollTop()
			vm.$dispatch('scrolling.tk.scrollable', scrollTop)
			clearTimeout(this.scrollTimer)
			this.scrollTimer = setTimeout(function () {
				let scrollTop = scrollable.simplebar('getScrollElement').scrollTop()
				vm.$dispatch('end-scrolling.tk.scrollable', scrollTop)
			}, 100)
		})
		vm.$on('scrollTo.tk.scrollable', (id) => {
			let toElement = document.querySelector(id)
			if (toElement) {
				$(this.el).simplebar('getScrollElement').animate({
					scrollTop: toElement.offsetTop
				})
			}
		})
	},
	unbind () {
		$(this.el).simplebar().off('scroll')
	}
}