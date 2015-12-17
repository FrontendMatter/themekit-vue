<template>
    <div id="{{ carouselId }}" class="carousel slide">
        <ol v-if="indicators && items.length>1" class="carousel-indicators">
            <li 
                v-for="item in items" 
                :data-target="'#' + carouselId" 
                :data-slide-to="$index" 
                :class="{ 'active': item.active }">
            </li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <slot></slot>
        </div>
        <template v-if="controls && items.length>1">
            <a class="left carousel-control" href="#{{ carouselId }}" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#{{ carouselId }}" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </template>
    </div>
</template>

<script>
    var shortid = require('shortid');
    module.exports = {
        props: {
            indicators: {
                type: Boolean,
                default: true
            },
            controls: {
                type: Boolean,
                default: true
            }
        },
        data: function() {
            return {
                items: []
            }
        },
        computed: {
            carouselId: function() {
                return shortid.generate();
            }
        },
        events: {
            'carousel-item': function(item) {
                this.items.push(item);
            }
        }
    }
</script>