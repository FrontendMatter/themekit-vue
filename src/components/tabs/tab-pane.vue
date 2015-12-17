<template>
    <div class="tab-pane" :class="{ active: active }" :id="tabId">
        <template v-if="scrollable">
            <div v-scrollable>
                <slot></slot>
            </div>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
    var shortid = require('shortid');
    module.exports = {
        data: function() {
            return {
                tabId: shortid.generate()
            }
        },
        props: {
            active: {
                type: Boolean
            },
            scrollable: {
                type: Boolean
            },
            icon: {
                type: String
            },
            label: {
                type: String,
                required: true
            }
        },
        created: function() {
            this.$dispatch('tab-pane', this);
        }
    }
</script>