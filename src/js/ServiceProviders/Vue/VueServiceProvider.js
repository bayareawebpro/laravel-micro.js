import Vue from 'vue'
import VueRouter from "vue-router"
import {ServiceProvider} from "laravel-micro.js"
import EventBus from "./EventBus"
import Routes from "./Routes"
import Root from "../../Pages/Root"
Vue.use(VueRouter)
export default class VueServiceProvider extends ServiceProvider {

	constructor(app) {
		super(app)
		this.deferred = false
	}

	/**
	 * Register any application services
	 * @return void
	 */
	register() {
		Vue.config.silent = false
		Vue.prototype.$app = this.app
		Vue.config.errorHandler = function (err, vm, info) {
			console.error(err, vm, info)
		}
		Vue.config.warnHandler = function (msg, vm, trace) {
			console.warn(msg, vm, trace)
		}
		this.app.bind('Vue', () => Vue)
		this.app.bind('Events', EventBus)
		this.app.bind('routerLinks', [
			{
				path: '/dashboard',
				icon: 'fa-tachometer-alt',
				label: 'Dashboard'
			},
			{
				path: '/services',
				icon: 'fa-cubes',
				label: 'Services'
			},
			{
				path: '/sharing',
				icon: 'fa-code-branch',
				label: 'Sharing'
			},
			{
				path: '/config',
				icon: 'fa-edit',
				label: 'Config'
			},
			{
				path: '/logs',
				icon: 'fa-book',
				label: 'Logs'
			},
			// {
			// 	path: '/service-swap',
			// 	icon: 'fa-retweet',
			// 	label: 'Swap'
			// },
		])

	}

	/**
	 * Boot any application services
	 * @return void
	 */
	boot() {
		Vue.component('v-offcanvas', ()=> import(/* webpackChunkName: "components" */ '@components/v-offcanvas.vue'))
		Vue.component('v-toasts', ()=> import(/* webpackChunkName: "components" */ '@components/v-toasts.vue'))
		Vue.component('v-logo', ()=> import(/* webpackChunkName: "components" */ '@components/v-logo.vue'))
		Vue.component('v-modal', ()=> import(/* webpackChunkName: "components" */ '@components/v-modal.vue'))
		Vue.component('v-tabs', ()=> import(/* webpackChunkName: "components" */ '@components/v-tabs.vue'))
		Vue.component('v-code', ()=> import(/* webpackChunkName: "components" */ '@components/v-code.vue'))
		Vue.directive('highlightjs',()=> import(/* webpackChunkName: "highlightjs" */ './Highlight.js') )

		this.app.bind('Router', () => new VueRouter(Routes))

		//Add Root Vue Instance
		this.app.bind('VueRoot', (Router, Events) => {

			//Capture a new request instance and run it through the middleware pipeline.
			Router.beforeEach((to, from, next) => {
				Events.$emit('offcanvas:close:all')
				this.app.run({to, from, next})
			})

			//Stop any loading started by middleware..
			Router.afterEach((to, from, next) => {
				Events.$emit('app:loading', false)
			})

			//Add Router

			console.log('VueRoot Router', Router)
			Root.router = Router
			return new Vue(Root)
		})
	}

	/**
	 * Declare the aliases for the provided services
	 * @return {Array}
	 */
	get provides() {
		return [
			'Vue',
			'Router',
			'routerLinks',
			'Events',
			'VueRoot'
		]
	}
}
