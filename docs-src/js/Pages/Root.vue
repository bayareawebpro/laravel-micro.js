<script>
	export default {
		name: 'Root',
		router: null,
		data() {
			return {
				showLeftMenu: false,
				loading: 'Booting',
			}
		},
		computed: {
			routerLinks() {
				return this.$app.make('routerLinks')
			}
		},
		watch:{
			'$route.path':{
				handler(){
					if(this.$route.path === '/'){
						this.move({
							width: this.$refs.home.clientWidth,
							left: this.$refs.home.offsetLeft,
						})
					}else if(this.$route.path === '/about'){
						this.move({
							width: this.$refs.about.clientWidth,
							left: this.$refs.about.offsetLeft,
						})
					}else{
						this.move({
							width: 0,
							left: 0,
						})
					}
				},
			}
		},
		methods: {
			toast(obj = {}) {
				this.$events.$emit('app:toast', obj)
			},
			appIsLoading(state) {
				this.loading = state
			},
			icon(icon, path) {
				const nextPath = this.loading ? this.$router ? this.$router.history.pending.path : null : null
				return nextPath === path ? 'fa fa-circle-notch fa-spin' : `fa ${icon}`
			},
			closeMenu() {
				this.showLeftMenu = false
			},
			move({width, left}){
				this.$refs.slider.style.transition = `all 300ms ease-in-out`
				this.$refs.slider.style.width = `${width}px`
				this.$refs.slider.style.left = `${left}px`
			},
			navMove({srcElement}){
				this.move({width: srcElement.clientWidth, left: srcElement.offsetLeft })
			}
		},
		created() {
			this.$events = this.$app.make('Events')
			this.$events.$on('app:loading', this.appIsLoading)
			this.$events.$on('app:closeMenu', this.closeMenu)
		},
		beforeDestroy() {
			this.$events.$off('app:loading', this.appIsLoading)
			this.$events.$off('app:closeMenu', this.closeMenu)
		}
	}
</script>
<template>
	<div class="d-flex flex-column" style="min-height: 100%">
		<header class="position-relative">
			<nav id="nav-primary" class="navbar navbar-expand navbar-light bg-light shadow-sm border-bottom">
				<div class="container-fluid container-wide">
					<a class="nav-link text-center d-inline-block" @click="$events.$emit('offcanvas:toggle', 'left')">
						<i class="fa fa-bars text-dark"></i>
					</a>
					<span ref="home">
						<router-link exact to="/" class="navbar-brand">
							Laravel<span class="text-primary">Micro</span>.js
						</router-link>
					</span>
					<ul class="navbar-nav mr-auto">
						<li class="nav-item text-nowrap" ref="about">
							<router-link exact to="/about" class="nav-link">About</router-link>
						</li>
						<li class="nav-item text-nowrap"> <!-- d-none d-sm-inline-flex -->
							<a class="nav-link text-center mr-2" href="https://github.com/bayareawebpro/laravel-micro.js" target="_blank">
								<i class="fab fa-github text-dark"></i>
								GitHub</a>
						</li>
					</ul>
					<ul class="navbar-nav ml-auto">
						<li class="nav-item text-nowrap">
							<!--<a class="nav-link text-center d-inline-block" @click="$events.$emit('offcanvas:toggle', 'right')">-->
								<!--<i class="fa fa-bars text-dark"></i>-->
							<!--</a>-->
						</li>
					</ul>
				</div>
			</nav>
			<div ref="slider" class="position-absolute nav-slider"></div>
		</header>
		<main class="d-flex flex-row flex-fill">
			<v-offcanvas>
				<template slot="left">
						<ul class="nav flex-column flex-fill pt-2">
							<li class="nav-item" v-for="route in routerLinks">
								<router-link tag="a" :to="route.path" exact class="nav-link">
									<span style="min-width: 20px" class="text-center d-inline-block">
										<i :class="icon(route.icon, route.path)"></i>
									</span>
									<span class="item-text text-secondary">{{ route.label }}</span>
								</router-link>
							</li>
						</ul>
				</template>
				<template slot="push">
					<transition
						name="router"
						mode="out-in"
						enter-active-class="animated fast fadeIn"
						leave-active-class="animated fast fadeOut"
						class="router"
					>
						<div v-if="loading" class="h-100 d-flex justify-content-center align-items-center">
							<div class="d-block text-primary text-center animated fast fadeInRight">
								<v-logo :size="50"></v-logo>
								<div class="text-secondary" style="font-size: 13px; min-width: 200px">
									<strong>{{ typeof loading === 'boolean' ? 'Loading...' : loading }}...</strong>
								</div>
								<i class="fa fa-circle-notch fa-spin"></i>
							</div>
						</div>
						<router-view v-else></router-view>
					</transition>
				</template>
				<!--<template slot="right">-->
					<!--<ul class="nav flex-column flex-fill pt-2">-->
						<!--<li class="nav-item" v-for="route in routerLinks">-->
							<!--<router-link tag="a" :to="route.path" exact class="nav-link">-->
									<!--<span style="min-width: 20px" class="text-center d-inline-block">-->
										<!--<i :class="icon(route.icon, route.path)"></i>-->
									<!--</span>-->
								<!--<span class="item-text text-secondary">{{ route.label }}</span>-->
							<!--</router-link>-->
						<!--</li>-->
					<!--</ul>-->
				<!--</template>-->
			</v-offcanvas>
		</main>
		<footer id="footer" class="flex-grow-0 bg-light border-top">
			<div class="container-fluid text-center">
				<!-- Please leave my copyright intact.  Give credit where credit is due. -->
				<p class="text-muted small align-self-center m-0 p-2" style="font-size: 11px;">
					&copy; Copyright Dan Alvidrez - All Rights Reserved.
				</p>
				<!-- Please leave my copyright intact.  Give credit where credit is due. -->
			</div>
		</footer>
		<v-toasts ref="toasts"></v-toasts>
	</div>
</template>
<style lang="sass">
html, body
	height: 100vh !important
	width: 100vw !important
	overflow-x: hidden
	header, footer
		z-index: 2
	.nav-link
		color: #525252
		min-width: 20px
		cursor: pointer
	* .nav-link.router-link-active,
	* .nav-link.router-link-exact-active
		font-weight: bold !important
		color: var(--primary) !important
	.animated.fast
		animation-duration: 160ms !important
	.nav-slider
		background-color: var(--primary) !important
		height: 2px !important
		bottom: 0
		left: 0
</style>