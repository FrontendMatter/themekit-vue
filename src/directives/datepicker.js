try {
	// optional
	require('bootstrap-datepicker')
} 
catch (e) {
	// do nothing, we can check on $.fn
}

export default {
	bind () {
		if (typeof $.fn.datepicker !== 'undefined') {
			$(this.el).addClass('datepicker').datepicker()
		}
	}
}