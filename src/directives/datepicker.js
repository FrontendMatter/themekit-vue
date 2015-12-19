import 'bootstrap-datepicker'

export default {
	bind () {
		$(this.el).addClass('datepicker').datepicker()
	}
}