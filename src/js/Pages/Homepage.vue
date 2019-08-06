<script>
	export default {
		name: 'Homepage',
		computed:{
			talkingPoints(){
				return [
					{
						color: 'purple',
						icon: 'fa fa-cubes',
						title: 'Container',
						desc: 'The IOC Container can read arguments and construct concrete instances.',
						examples: [
							{name: 'Binding',   import: 'binding',   hash: 'binding'},
							{name: 'Make',      import: 'make',      hash: 'make'},
							{name: 'Injection', import: 'injection', hash: 'injection'},
						],
					},
					{
						color: 'orange',
						icon: 'fa fa-hand-holding',
						title: 'Service Providers',
						desc: 'A Laravel-like Service Locator is built for A/B Testing from the ground up.',
						examples: [
							{name: 'Provider',      import: 'provider',          hash: 'provider'},
							{name: 'Registration',  import: 'providerRegister',  hash: 'register'},
							{name: 'Async',         import: 'async',             hash: 'async'},
						],
					},
					{
						color: '#e3342f',
						icon: 'fa fa-layer-group',
						title: 'Middleware Pipeline',
						desc: 'The middleware pipeline provides a flexible solution for simplifying in-app requests.',
						examples: [
							{name: 'Pipe',     import: 'middleware',  hash: 'middleware'},
							{name: 'Kernel',   import: 'kernel',      hash: 'kernel'},
							{name: 'Router',   import: 'router',      hash: 'router'},
							{name: 'App',       import: 'app',        hash: 'app'},
						],
					},
					{
						color: '#f85443',
						icon: 'fab fa-laravel',
						title: 'Inspired by Laravel',
						desc: 'Created for Web Artisans',
						examples: [],
						link: 'laravel.com',
					},
					{
						color: '#6cb2eb',
						icon: 'fab fa-linkedin',
						title: 'Designed by Daniel Alvidrez',
						desc: 'Made with ♥️in the SF, Bay Area',
						examples: [],
						link: 'linkedin.com/in/danalvidrez',
					},
				]
			}
		},
		created() {
			this.events = this.$app.make('Events')
		}
	}
</script>
<template>
	<div class="container-fluid">

		<div class="pt-4 pb-4 d-flex flex-column justify-content-center align-items-center">
			<v-logo :size="100" type="big"></v-logo>
			<h1 class="text-dark m-0 animated zoomInLeft">
				Laravel<span class="text-primary">Micro</span>.js
			</h1>
			<div class="animated fadeInUp text-center">
				<p class="lead text-muted">A Javascript based IOC Container for Web Artisans </p>
				<p class="mt-2"><code class="bg-dark text-light rounded p-1">artisan make:micro</code></p>
				<p>

					<a target="_blank" class="btn btn-primary" href="https://github.com/bayareawebpro/laravel-micro-preset">
						<i class="fa fa-arrow-alt-circle-right"></i> Laravel Preset Installer
					</a>
				</p>
			</div>
			<div class="mt-3">
				<div
					v-for="(point, index) in talkingPoints"
					class=" animated fadeIn"
					:style="`animation-delay: ${(index * 300) + 200}ms`"
				>
					<div class="card shadow-sm text-center mb-3">
						<div class="card-body pt-4 pb-3 pl-3 pr-3">
							<p class="card-text m-0 mb-2">
								<i :class="'fa-2x ' + point.icon" :style="`color: ${point.color}`"></i>
								<br/>{{ point.title }}
							</p>
							<p class="small">{{ point.desc }}</p>
						</div>
						<div class="card-footer" v-if="point.link || point.examples">
							<a
								v-if="point.link"
								:href="'//' + point.link"
								class="btn btn-sm btn-outline-secondary"
								target="_blank"
							>
								{{ point.link }}
							</a>
							<button class="btn btn-sm btn-outline-secondary" @click="events.$emit('point' + index)" v-if="point.examples && point.examples.length">
								See example
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>


		<v-modal :value="(index === -1)" :title="point.title" :event="'point' + index" v-for="(point, index) in talkingPoints.filter((p)=>p.examples)" :key="index" :fullscreen="true" >
			<v-tabs :tabs="point.examples" :no-hash="true" class="rounded-0 h-100" style="overflow-y: scroll; overflow-x: hidden;background-color: #2b2b2b">
				<template :slot="example.hash" v-for="(example, pointIdx) in point.examples">
					<v-code :import="example.import" :key="pointIdx" class="h-100"></v-code>
				</template>
			</v-tabs>
			<template slot="footer">
				<!-- Please leave my copyright intact.  Give credit where credit is due. -->
				<div class="small text-center text-muted"><small>© Copyright Dan Alvidrez - All Rights Reserved.</small></div>
				<!-- Please leave my copyright intact.  Give credit where credit is due. -->
			</template>
		</v-modal>
	</div>
</template>
