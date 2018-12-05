export default {
    mode: 'hash',
    base: '/',
    routes: [
        {
            path: '/',  component: () => import(/* webpackChunkName: pages */ '@pages/Root.vue'),
            children: [
                { path: '', component: () => import(/* webpackChunkName: pages */ '@pages/Dashboard.vue') },
                { path: '/logs', component: () => import(/* webpackChunkName: pages */ '@pages/Logs.vue') },
                { path: '/config', component: () => import(/* webpackChunkName: pages */ '@pages/Config.vue') },
                { path: '/sharing', component: () => import(/* webpackChunkName: pages */ '@pages/Sharing.vue') },
                { path: '/service-swap', component: () => import(/* webpackChunkName: pages */ '@pages/ServiceSwap.vue') },
            ]
        },
        {
            path: '*',  component: () => import(/* webpackChunkName: pages */ '@pages/Root.vue'),
            children: [
                { path: '', component: () => import(/* webpackChunkName: pages */ '@pages/404.vue') },
            ]
        },
    ]
}
