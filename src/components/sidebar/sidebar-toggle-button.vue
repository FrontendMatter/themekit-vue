<template>
    <a :href="'#' + sidebarId" v-on:click.stop.prevent="toggle" :class="buttonClass">
        <template v-if="!toggleBar"><i class="{{ icon }}"></i></template>
    </a>
</template>

<script>
    module.exports = {
        props: {
            sidebarId: {
                type: String,
                required: true
            },
            toggleBar: {
                type: Boolean
            },
            icon: {
                type: String,
                default: 'fa fa-bars'
            }
        },
        computed: {
            buttonClass: function() {
                var classes = ['toggle', 'pull-left', 'visible-xs'];
                var classObj = {};
                if (this.hasParentNavbar()) {
                    classes.forEach(function(className){
                        classObj[className] = true;
                    });
                }
                if (this.toggleBar)
                    classObj['sidebar-toggle-bar'] = true;
                return classObj;
            }
        },
        ready: function() {
            this.button = $(this.$el);
        },
        methods: {
            toggle: function() {
                this.$dispatch('sidebar-toggle-button.toggle', this.sidebarId);
            },
            hasParentNavbar: function() {
                return this.$parent.$options.name == 'navbar';
            }
        },
        events: {
            'sidebar.open': function(sidebarId) {
                if (this.sidebarId !== sidebarId) return;
                this.button
                    .addClass('active')
                    .closest('li')
                    .addClass('active');
            },
            'sidebar.reset': function(sidebarId) {
                if (this.sidebarId !== sidebarId) return;
                this.button
                    .removeClass('active')
                    .closest('li')
                    .removeClass('active');
            }
        }
    }
</script>

<style lang="less">
    @import "~themekit-less/src/sidebar/toggle-bar";
</style>