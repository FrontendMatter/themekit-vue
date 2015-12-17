require('bootstrap-datepicker');
module.exports = {
    bind: function() {
        $(this.el).addClass('datepicker').datepicker();
    }
};