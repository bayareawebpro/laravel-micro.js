<script>
export default{
    data(){
        return {
            showLeftMenu: false,
            showRightMenu: false,
            loading: false
        }
    },
    methods:{
        isLoading(state){
            this.loading = state
        }
    },
    created(){
        this.$events = this.$app.make('Events')
        this.$events.$on('app:loading', this.isLoading)
    },
    beforeDestroy(){
        this.$events.$off('app:loading', this.isLoading)
    }
}
</script>
<template>
    <div class="d-flex flex-column h-100 w-100">
        <header>
            <nav id="nav-primary" class="navbar navbar-expand navbar-light bg-light shadow-sm pl-0 pr-0 border-bottom">
                <div class="container-fluid container-wide pl-3 pr-3">
                    <a class="navbar-brand ml-1" @click="$events.$emit('offcanvas:left')" >
                        Laravel<span class="text-danger">Micro</span>.js
                    </a>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item text-nowrap">
                            <router-link to="/" exact class="nav-link">
                                Dashboard
                            </router-link>
                        </li>
                        <li class="nav-item text-nowrap">
                            <router-link to="/service-swap" exact class="nav-link">
                                Service Swap
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div id="layout" class="d-flex flex-grow-1">
            <v-offcanvas
                    v-model="showLeftMenu"
                    event="offcanvas:left"
                    :value="true"
                    side="left"
                    :width="170"
            >
                <template slot="default">
                    <div class="p-1 p-lg-2 h-100 bg-light">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <router-link tag="a" to="/" exact class="nav-link">
                                    <i class="fa fa-edit"></i> <span>Dashboard</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link tag="a" to="/sharing" exact class="nav-link">
                                    <i class="fa fa-edit"></i> <span>Sharing</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link tag="a" to="/logs" exact class="nav-link">
                                    <i class="fa fa-edit"></i> <span>Logs</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link tag="a" to="/config" exact class="nav-link">
                                    <i class="fa fa-edit"></i> <span>Config</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </template>
                <template slot="push">
                    <transition
                            name="router"
                            mode="out-in"
                            enter-active-class="animated fast fadeIn"
                            leave-active-class="animated fast fadeOut"
                            tag="div"
                            class="router"
                    >
                        <div v-if="loading" class="h-100 w-100 d-flex justify-content-center align-items-center bg-light position-absolute sticky" style="z-index: 1000">
                            <div class="m-3 d-block text-primary text-center">
                                <i class="fa fa-spinner fa-spin fa-2x"></i><br>
                                Artisanizing Application...
                            </div>
                        </div>
                        <router-view v-else></router-view>
                    </transition>
                </template>
            </v-offcanvas>
        </div>
        <footer id="footer" class="flex-grow-0 bg-light border-top">
            <div class="container-fluid text-center">
                <p class="text-muted small align-self-center m-0 p-2" style="font-size: 11px;">
                    &copy; Copyright Dan Alvidrez - All Rights Reserved.
                </p>
            </div>
        </footer>
        <v-toasts ref="toasts"></v-toasts>
    </div>
</template>
<style lang="sass">
html,body
    height: 100vh !important
    overflow-x: hidden
.router-link-active,
.router-link-exact-active
    font-weight: bold !important
.animated.fast
    animation-duration: 160ms !important
</style>
