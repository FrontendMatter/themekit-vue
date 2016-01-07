import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter()

router.map({
	'/:id': {
		component: function (resolve) {
			require([`./demos/${ router.app.$route.params.id }`], resolve)
		}
	}
})

router.beforeEach(function () {
	window.scrollTo(0, 0)
})

router.redirect({
	'*': '/sidebar'
})

export default router