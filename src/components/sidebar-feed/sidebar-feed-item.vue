<script>
    module.exports = {
        props: {
            unread: {
                type: Boolean
            },
            user: {
                type: String,
                required: true
            },
            action: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        },
        ready: function() {
            this.$dispatch('sidebar-feed-item', this);
        }
    }
</script>