// optional external
try {
	require('simplebar/src/simplebar')
}
catch (e) {
	// do nothing, we can check on $.fn.simplebar
}

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
		if (typeof $.fn.simplebar !== 'undefined') {
			$(this.el).simplebar({
				autoHide: false
			})
			var vm = this.vm
			$(this.el).simplebar().on('scroll', function () {
				var scrollable = $(this)
				clearTimeout(this.scrollTimer)
				vm.$dispatch('scrolling.tk.scrollable')
				this.scrollTimer = setTimeout(function () {
					var scrollTop = scrollable.simplebar('getScrollElement').scrollTop()
					vm.$dispatch('end-scrolling.tk.scrollable', scrollTop)
				}, 100)
			})
		}
	},
	unbind () {
		if (typeof $.fn.simplebar !== 'undefined') {
			$(this.el).simplebar().off('scroll')
		}
	}
}