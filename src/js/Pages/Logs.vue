<script>
	export default {
		name: 'Dashboard',
		methods: {
			flush() {
				this.$app.logOutput = []
				this.$forceUpdate()
			},
		}
	}
</script>
<template>
	<div class="container-fluid">
		<div class="flex-row flex-grow-0">
			<button @click="flush" class="btn btn-secondary btn-sm float-right">Flush</button>
			<h2 class="text-primary">Logs</h2>
			<p>Summary of the application container and loaded services.</p>
		</div>
		<div ref="scrollable" class="list-group scrollable border rounded">
			<div v-if="$app.logOutput.length === 0" class="list-group-item border-left-0 border-right-0">
				Nothing to show.
			</div>
			<div v-else v-for="(entry, index) in $app.logOutput" class="list-group-item border-left-0 border-right-0">
				{{ entry.toString() }}
			</div>
		</div>
	</div>
</template>
<style lang="sass">
	.scrollable
		z-index: 0
		padding: 5px 0
		background: #2b2b2b
		.list-group-item
			font-size: 12px
			padding: 2px 10px
			color: aqua !important
			background: transparent
		.list-group-item:first-of-type
			border-top: none
		.list-group-item:last-of-type
			border-bottom: none
</style>
