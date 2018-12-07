<script>
	export default {
		data() {
			return {
				service: this.$app.make('ServiceInstance')
			}
		},
		methods: {
			swapImplementation() {
				const swap = this.$app.make('swapper')
				this.service = swap(this.service)
			},
			change(){
				document.documentElement.style.setProperty('--primary', this.service.content)
			}
		},
	}
</script>
<template>
	<div class="p-3">
		<h3><i class="fa fa-retweet"></i> Swapable Service </h3>

		<p class="text-muted">
			This example demonstrates how you can persist state across multiple
			implementations as they are swapped by a service provider.
		</p>

		<p class="text-muted">
			<i class="fa fa-info-circle"></i>
			Check the <router-link to="/logs">Logs</router-link> to see the output of the processes as you swap implementations.
			Using the async binding method shown in the example on the homepage you can import bindings from remote servers.
		</p>

		<div v-if="service">
			<p class="text-muted">Current Version: {{ service.getVersion() }}</p>
			{{ service.fieldLabel }}
			<input :type="service.fieldType" class="form-control" v-model="service.content" @change="change">
		</div>

		<hr>
		<button class="btn btn-primary" @click="swapImplementation">
			Swap Implementation
		</button>
		<hr>
		<h4>Swapable Service Component</h4>
		<v-code import="swapD" style="height: 330px; overflow: hidden"></v-code>

		<hr>
		<h4>Swapable Service Abstract</h4>
		<p></p>
		<v-code import="swapA" style="height: 440px; overflow: hidden"></v-code>

		<hr>
		<h4>Service Implementations</h4>
		<v-code import="swapB" style="height: 400px; overflow: hidden"></v-code>

		<hr>
		<h4>Swapable Service Provider</h4>
		<v-code import="swapC" style="height: 960px; overflow: hidden"></v-code>
	</div>
</template>