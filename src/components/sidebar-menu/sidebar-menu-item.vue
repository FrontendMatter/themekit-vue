<template>
    <li class="sidebar-menu-item" :class="{ active: active, 'hasSubmenu': submenu }">
        <template v-if="submenu">
            <a class="sidebar-menu-button"
                v-el:submenu-button
                :href="'#' + submenuId" 
                :data-toggle="menuType == 'collapse' ? 'collapse' : false">
                <i class="sidebar-menu-icon" v-if="icon" :class="icon"></i>
                <span>{{ label }}</span>
            </a>
            <ul class="sidebar-submenu"
                v-el:submenu-element 
                v-show="menuType == 'collapse'"
                :id="submenuId" 
                :class="{ collapse: menuType == 'collapse' }">
                <slot></slot>
            </ul>
        </template>
        <template v-else>
            <a class="sidebar-menu-button" v-el:menu-button v-link="link">
                <i class="sidebar-menu-icon" v-if="icon" :class="icon"></i>
                <span>{{ label }}</span>
            </a>
            <slot></slot>
        </template>
    </li>
</template>
<script>
    var shortid = require('shortid');
    var camelCase = require('mout/string/camelCase');
    module.exports = {
        data: function() {
            return {
                sidebarEl: null,
                menuType: null
            }
        },
        computed: {
            submenuId: function() {
                if (! this.submenu)
                    return null;
                return shortid.generate();
            }
        },
        props: {
            link: {
                type: Object
            },
            href: {
                type: String
            },
            label: {
                type: String,
                default: 'Menu Item'
            },
            icon: {
                type: String
            },
            active: {
                type: Boolean
            },
            submenu: {
                type: Boolean
            }
        },
        methods: {
            initMenuType: function(menuType) {
                return menuType 
                    ? camelCase('init-' + menuType) 
                    : (this.menuType ? camelCase('init-' + this.menuType) : null);
            },
            removeMenuType: function(menuType) {
                return menuType 
                    ? camelCase('remove-' + menuType) 
                    : (this.menuType ? camelCase('remove-' + this.menuType) : null);
            },
            item: function() {
                return $(this.$el);
            },
            submenuElement: function() {
                return $(this.$els.submenuElement);
            },
            submenuButton: function() {
                return $(this.$els.submenuButton);
            },
            menuButton: function() {
                return $(this.$els.menuButton);
            },
            sidebarElement: function() {
                return $(this.sidebarEl);
            },
            initSubmenu: function(value) {
                var menuTypeMethod = this.initMenuType(value);
                if (! menuTypeMethod) return;
                if (typeof this[menuTypeMethod] == 'function')
                    this[menuTypeMethod]();
            },
            removeSubmenu: function(value) {
                var menuTypeMethod = this.removeMenuType(value);
                if (! menuTypeMethod) return;
                if (typeof this[menuTypeMethod] == 'function')
                    this[menuTypeMethod]();
            },
            initCollapse: function() {
                var self = this;
                this.submenuElement().on('show.bs.collapse', function (e) {
                    e.stopPropagation();
                    var parents = $(this).parents('ul:first').find('> li.open > ul');
                    if (parents.length)
                        parents.collapse('hide').closest('.hasSubmenu').removeClass('open');
                    self.item().addClass('open');
                });
                this.submenuElement().on('hidden.bs.collapse', function (e) {
                    e.stopPropagation();
                    self.item().removeClass('open');
                });
            },
            removeCollapse: function() {
                this.submenuButton().off();
                this.submenuElement().off();
                this.submenuElement().removeClass('in');
                this.submenuButton().removeClass('collapsed');
            },
            initDropdown: function() {
                var self = this;
                this.submenuButton()
                    .on('mouseenter', function() {
                        self.sidebarElement().find('.open').removeClass('open');
                        if (! self.item().hasClass('open') && ! self.sidebarElement().is('.scrolling')) {
                            self.item().addClass('open');
                            self.$dispatch('sidebar-menu-item.dropdown', {
                                label: self.label,
                                icon: self.icon,
                                active: self.active,
                                link: self.link,
                                offsetTop: self.item().offset().top,
                                children: self.$children
                            });
                        }
                    })
                    .on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
            },
            removeDropdown: function() {
                if (this.submenu) {
                    this.submenuButton().off();
                    this.item().removeClass('dropdown open');
                }
                else {
                    this.menuButton().off();
                }
            },
            invalidParent: function() {
                return ['sidebar-menu', 'sidebar-menu-item'].indexOf(this.$parent.$options.name) === -1;
            }
        },
        ready: function() {

            if (this.invalidParent())
                return;

            if (this.$children.length && ! this.submenu) {
                this.submenu = true;
                this.$dispatch('sidebar.context.request');
            }
        },
        beforeDestroy: function() {
            this.removeSubmenu();
        },
        watch: {
            menuType: function(newValue, oldValue) {
                var self = this;
                this.removeSubmenu(oldValue);
                this.sidebarElement().find('.open').removeClass('open');
                if (! this.submenu && this.menuType == 'dropdown') {
                    this.menuButton().on('mouseenter', function() {
                        self.sidebarElement().find('.open').removeClass('open');
                        self.$dispatch('sidebar-menu-item.dropdown', null);
                    });
                }

                if (this.submenu) {
                    this.$nextTick(function() {
                        this.initSubmenu(newValue);
                    });
                }
            }
        },
        events: {
            'sidebar.context': function(context) {
                this.sidebarEl = context.$el;
                this.menuType = context.menuType;
            }
        }
    }
</script>