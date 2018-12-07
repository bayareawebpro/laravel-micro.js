<script>
	export default {
		name: 'Dashboard',
		data() {
			return {
				status: this.getAppStats()
			}
		},
		methods: {
			getAppStats() {
				return Object.assign({}, Object.freeze({
					providers: this.$app.providers,
				}))
			},
			getRealName(obj) {
				const name = this.$app.getName(obj)
				if (name === 'Window') {
					return name.toLowerCase()
				}
				return name
			},
		}
	}
</script>
<template>
	<div class="container-fluid">
		<h2 class="text-primary">Service Providers</h2>
		<p>Summary of the application container and loaded services.</p>
		<hr>
		<div class="table-responsive bg-light shadow-sm">
			<table class="table table-bordered table-striped table-sm">
				<thead>
				<tr>
					<th>Name</th>
					<th>Provides</th>
					<th>Status</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(provider, name) in status.providers">
					<th scope="row" class="font-weight-bold">{{ name }}</th>
					<td>{{ provider.provides.join(', ') }}</td>
					<td>
						<div v-if="provider.isDeferred && !provider.isBooted">
							<i class="fa fa-clock text-secondary"></i> Deferred
						</div>
						<div v-else>
							<i class="fa fa-check-circle text-success"></i> Booted
						</div>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
