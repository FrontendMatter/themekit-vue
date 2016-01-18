/*
 * STYLES
 */

// BOOTSTRAP
import 'bootstrap-sass/assets/stylesheets/_bootstrap'

// ICONS
import 'font-awesome/css/font-awesome'

// THEMEKIT
import 'themekit-vue/dist/themekit.css'

/*
 * SCRIPTS
 */
 
import 'jquery'
import 'bootstrap-sass/assets/javascripts/bootstrap'
import 'modernizr/modernizr'

// ISOTOPE
import Isotope from 'isotope-layout'
import Packery from 'isotope-packery'
window.Isotope = Isotope
window.Packery = Packery

// HIGHLIGHT.JS
import 'highlight.js/lib/highlight'
import 'highlight.js/styles/github-gist'
import 'highlight.js/lib/languages/xml'
import 'highlight.js/lib/languages/javascript'
import 'js-beautify'

// Vue library
import Vue from 'vue'

// Load ThemeKit
import ThemeKit from 'themekit-vue'

// Setup
Vue.use(ThemeKit)