<script>
	export default {
		name: 'Dashboard',
		data() {
			return {
				status: this.getAppStats(),
				form: {
					key: '',
					value: null,
				}
			}
		},
		methods: {
			toggleEnv(state) {
				this.config.set('env', state)
				this.config.set('debug', state !== 'production')
				this.$app.debug(state !== 'production')
			},
			setConfig() {
				if (!this.form.key || !this.form.value) {
					return this.$root.toast({
						title: 'Whoops',
						body: `Key / Value Pair not filled.`,
						type: 'error'
					})
				}
				try {
					this.config.set(this.form.key, JSON.parse(this.form.value))
				} catch (e) {
					this.config.set(this.form.key, this.form.value)
				}
				this.$root.toast({
					title: 'Config Updated',
					body: `${this.form.key} was set successfully.`,
					type: 'success'
				})
				this.$forceUpdate()
			},
			getAppStats() {
				this.config = this.$app.make('Config')
				//NonReactive Properties
				return Object.assign({}, Object.freeze({
					config: this.config.all(),
				}))
			},
			getButtonClasses(env) {
				return {
					'btn-primary': this.status.config.env === env,
					'btn-secondary': this.status.config.env !== env,
				}
			},
		}
	}
</script>
<template>
	<div class="p-3 w-100">
		<h2 class="text-primary">Config</h2>
		<p>Summary of the application container and loaded services.</p>

		<div class="btn-group btn-group-toggle btn-group-sm">
			<button
				class="btn"
				:class="getButtonClasses('development')"
				:disabled="status.config.env === 'development'"
				@click="toggleEnv('development')"
			>Development
			</button>
			<button
				class="btn"
				:class="getButtonClasses('production')"
				:disabled="status.config.env === 'production'"
				@click="toggleEnv('production')"
			>Production
			</button>
		</div>

		<br>
		<br>

		<div class="input-group">
			<input class="form-control mr-2" v-model="form.key" placeholder="dot.syntax.key">
			<input class="form-control" v-model="form.value" placeholder="value">
			<div class="input-group-append">
				<button class="btn btn-secondary" @click="setConfig">Set</button>
			</div>
		</div>
		<hr>
		<div class="table-responsive bg-light shadow-sm" style="overflow: auto">
		<table class="table table-bordered table-striped table-sm m-0">
			<thead>
			<tr>
				<th>Key</th>
				<th>Value</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(value, key) in status.config">
				<th>{{ key }}</th>
				<td width="99%">
					<pre class="border rounded p-2 m-0" style="color: aqua; background: #2b2b2b">{{ value }}</pre>
				</td>
			</tr>
			</tbody>
		</table>
		</div>
	</div>
</template>
