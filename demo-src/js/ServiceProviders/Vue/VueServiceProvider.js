import Vue from 'vue'
import VueRouter from "vue-router"
import {ServiceProvider} from "laralite"
import EventBus from "./EventBus"
import Routes from "./Routes"
Vue.use(VueRouter)
export default class VueServiceProvider extends ServiceProvider{

    constructor(app) {
        super(app)
        this.deferred = false
    }

    /**
     * Register any application services
     * @return void
     */
    register() {
        Vue.prototype.$app = this.app

        //Add Vue
        this.app.bind('Vue', () => Vue)

        //Add Events
        this.app.bind('Events', EventBus)

        //Add Router
        // this.app.bind('Router', () => {
        //     return router
        // })

        //Add Root Vue Instance
        this.app.bind('VueRoot', (Events) => {
            console.log(Events)
            const router = new VueRouter(Routes)
            router.beforeEach((to, from, next)=>{
                this.app.log('========= New Request =========')
                //Set the application loading state.
                //Events.$emit('app:loading', true)

                //Capture a new request instance and run it through the middleware pipeline.
                this.app.run(this.app.make('Request').capture(to, from, next))
            })

            router.afterEach((to, from, next)=>{
                //Set the application loading state.
                //Events.$emit('app:loading', false)
            })
            return new Vue({
                name: 'App',
                router: router,
                template: `<router-view></router-view>`,
                methods:{
                    toast(obj = {}){
                        const events = this.$app.make('Events')
                        events.$emit('app:toast', obj)
                    },
                }
            }).$mount('#app')
        })
    }

    /**
     * Boot any application services
     * @return void
     */
    boot() {
        Vue.component('v-offcanvas', require('@components/v-offcanvas.vue'))
        Vue.component('v-toasts', require('@components/v-toasts.vue'))


    }

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */
    get provides() {
        return [
            'Vue',
            'Events',
            'VueRoot'
        ]
    }
}
