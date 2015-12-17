<template>
    <div v-show="tabs.length" :class="tabsClass">
        <ul :class="navClass">
            <li v-for="tab in tabs" :class="{ active: tab.active }">
                <a href="#{{ tab.tabId }}" data-toggle="tab">
                    <i v-if="tab.icon" :class="tab.icon"></i>
                    <template v-if="tab.label">{{ tab.label }}</template>
                </a>
            </li>
        </ul>
        <div class="tab-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                tabs: []
            }
        },
        props: {
            responsive: {
                type: String
            },
            stacked: {
                type: Boolean,
                default: false
            },
            align: {
                type: String,
                default: 'left'
            },
            vertical: {
                type: Boolean
            }
        },
        computed: {
            tabsClass: function() {
                var obj = {
                    'tabbable': true
                };

                if (this.tabsWithIcons.length == this.tabsWithoutLabels.length)
                    obj['tabs-icons'] = true;

                if (this.stacked)
                    obj['tabs-blocks'] = true;

                if (this.vertical) {
                    obj['tabs-vertical'] = true;
                    if (['left', 'right'].indexOf(this.align) !== -1)
                        obj['tabs-' + this.align] = true;
                }
                else {
                    if (this.align == 'center')
                        obj['tabs-center-h'] = true;
                }

                return obj;
            },
            navClass: function() {
                var obj = {
                    'nav': true,
                    'nav-tabs': true
                };
                
                if (this.responsive)
                    obj['tabs-responsive-' + this.responsive] = true;

                return obj;
            },
            tabsWithIcons: function() {
                return this.tabs.filter(function(tab) {
                    return typeof tab.icon !== 'undefined';
                });
            },
            tabsWithoutLabels: function() {
                return this.tabs.filter(function(tab) {
                    return typeof tab.label == 'undefined';
                });
            }
        },
        events: {
            'tab-pane': function(tab) {
                this.tabs.push(tab);
            }
        }
    }
</script>

<style lang="less">
    @import "~themekit-less/src/elements/tabs";
</style>