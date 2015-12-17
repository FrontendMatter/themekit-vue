<template>
    <div class="split-vertical" v-show="tabs.length">
        <div class="sidebar-block" :class="sidebarTabsClass">
            <ul :class="navClass">
                <li v-for="tab in tabs" :class="{ active: tab.active }">
                    <a href="#{{ tab.tabId }}" data-toggle="tab">
                        <i v-if="tab.icon" :class="tab.icon"></i>
                        <template v-if="tab.label">{{ tab.label }}</template>
                    </a>
                </li>
            </ul>
        </div>
        <div class="split-vertical-body">
            <div class="split-vertical-cell">
                <div class="tab-content sidebar-tab-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var Tabs = require('../tabs/tabs.vue');
    module.exports = {
        mixins: [ Tabs ],
        events: {
            'sidebar.context': function(sidebar) {
                sidebar.scrollable = false;
                return true;
            }
        },
        computed: {
            sidebarTabsClass: function() {
                var tabsClass = this.tabsClass;
                tabsClass['sidebar-tabbable'] = true;
                return tabsClass;
            }
        }
    }
</script>

<style lang="less">
    @import "~themekit-less/src/sidebar-elements/sidebar-tabs";
</style>