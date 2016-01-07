import Vue from 'vue'

var App = Vue.extend({
	template: '<router-view></router-view>'
})

// Router
import router from './router.demo'

// Important: App.replace must be 'false' or it will replace the entire 'body' tag
router.start(App, 'demo')