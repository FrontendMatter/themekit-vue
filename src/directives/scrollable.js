require('simplebar/src/simplebar');
module.exports = {
    params: {
        horizontal: {
            type: Boolean
        }
    },
    bind: function() {
        $(this.el).addClass('simplebar');

        if (this.params.horizontal)
            $(this.el).addClass('horizontal');

        $(this.el).simplebar({
            autoHide: false
        });

        var vm = this.vm;
        $(this.el).simplebar().on('scroll', function() {
            var scrollable = $(this);
            clearTimeout(this.scrollTimer);
            vm.$dispatch('scrollable.scrolling');
            this.scrollTimer = setTimeout(function() {
                var scrollTop = scrollable.simplebar('getScrollElement').scrollTop();
                vm.$dispatch('scrollable.scrolling.end', scrollTop);
            }, 100);
        });
    },
    unbind: function() {
        $(this.el).simplebar().off('scroll');
    }
};