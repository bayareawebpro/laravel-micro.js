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
		<p class="text-muted">Current Version: {{ service.getVersion() }}</p>
		{{ service.fieldLabel }}
		<input :type="service.fieldType" class="form-control" v-model="service.content" @change="change">
		<hr>
		<button class="btn btn-primary" @click="swapImplementation">
			Swap Implementation
		</button>
	</div>
</template>