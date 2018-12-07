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
				//NonReactive Properties
				return {
					sharedWith: this.$app.sharedWith,
					sharable: this.$app.sharable
				}
			},
			getRealName(obj) {
				const name = this.$app.getName(obj)
				if (name === 'Window') {
					return name.toLowerCase()
				}
				return name
			},
			share(alias) {
				this.$app.share(alias).withOthers(window)
				this.$forceUpdate()
			},
			unShare(alias) {
				this.$app.unShare(alias)
				this.$forceUpdate()
			}
		}
	}
</script>
<template>
	<div class="container-fluid">
		<h2 class="text-primary">Shared</h2>
		<p>Tracked Shared References to Services.</p>
		<div class="table-responsive bg-light shadow-sm">
			<table class="table table-bordered table-striped table-sm">
				<thead>
				<tr>
					<th>Alias</th>
					<th>Shared With</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(alias, index) in status.sharable">
					<th>{{ alias }}</th>
					<td>
						<ul class="m-0 pl-4">
							<li v-for="obj in status.sharedWith[alias]">
								{{ $app.getName(obj) }}: <code>{{ getRealName(obj) }}.{{ $app.getSharedAliasName(alias) }}()</code>
							</li>
						</ul>
					</td>
					<td style="max-width: 50px">
						<button @click="share(alias)" class="btn btn-primary btn-sm" v-if="!status.sharedWith[alias]">Share</button>
						<button @click="unShare(alias)" class="btn btn-secondary btn-sm" v-else>Revoke</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
