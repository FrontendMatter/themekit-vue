<template>

    <template v-if="sidebarTransitions">
        <div class="st-container">

            <!-- Navbar -->
            <slot name="navbar"></slot>

            <!-- Sidebars -->
            <slot name="sidebar"></slot>

            <!-- sidebar effects OUTSIDE of st-pusher: -->
            <!-- st-effect-1, st-effect-2, st-effect-4, st-effect-5, st-effect-9, st-effect-10, st-effect-11, st-effect-12, st-effect-13 -->

            <!-- content push wrapper -->
            <div class="st-pusher">

                <!-- Sidebars -->
                <slot name="sidebar-push"></slot>

                <!-- sidebar effects INSIDE of st-pusher: -->
                <!-- st-effect-3, st-effect-6, st-effect-7, st-effect-8, st-effect-14 -->

                <!-- this is the wrapper for the content -->
                <div class="st-content">

                    <!-- extra div for emulating position:fixed of the menu -->
                    <div class="layout-content st-content-inner" v-scrollable>

                        <!-- Content -->
                        <slot></slot>

                    </div>
                    <!-- /st-content-inner -->

                </div>
                <!-- /st-content -->

            </div>
            <!-- /st-pusher -->

        </div>
    </template>

    <template v-else>

        <!-- Navbar -->
        <slot name="navbar"></slot>

        <!-- Sidebars -->
        <slot name="sidebar"></slot>

        <!-- Content -->
        <div class="layout-content">
            <slot></slot>
        </div>

    </template>

</template>

<script>
    module.exports = {
        props: {
            sidebarTransitions: {
                type: Boolean
            }
        },
        methods: {
            applySidebarTransitions: function() {
                if (!this.sidebarTransitions)
                    return;
                document.querySelector('html').classList.add('st-layout');
            },
            applyLayoutSpacing: function() {
                if (document.querySelector('[slot="navbar"]'))
                    document.querySelector('html').classList.add('ls-top-navbar');
            }
        },
        ready: function () {
            this.applySidebarTransitions();
            this.applyLayoutSpacing();
            this.$root.$broadcast('layout.context', this);
        }
    }
</script>

<style lang="less">
    @import "~themekit-less/src/layout/app";
    @import "~themekit-less/src/layout/content";
    @import "~themekit-less/src/layout/footer";
    @import "~themekit-less/src/layout/grid";
    @import "~themekit-less/src/layout/split";
    @import "~themekit-less/src/layout/scrollable";
</style>