<script>
	export default {
		name: 'v-tabs',
		props: ['default', 'tabs', 'no-hash'],
		data() {
			return {
				activeTab: this.tabs[0],
				firstRun: true,
			}
		},
		computed: {
			windowHash: {
				cache: false,
				get() {
					return location.hash.substring(1)
				}
			},
			defaultTab: {
				cache: false,
				get() {
					const tab = this.getTabByHash(this.windowHash)
					return tab ? tab : this.default ? this.getTabByHash(this.default) : this.tabs[0]
				}
			}
		},
		watch: {
			activeTab: {
				handler(tab) {
					if (this.windowHash === tab.hash || this.noHash) return
					if (window.history.pushState) {
						window.history.pushState(null, null, '#' + tab.hash)
					}
				}
			}
		},
		methods: {
			isActive(tab) {
				return this.activeTab && this.activeTab.hash === tab.hash
			},
			hasSlot(name) {
				return !!this.$slots[name] || !!this.$scopedSlots[name]
			},
			getTabByHash(hash) {
				return this.tabs.find(function (tab) {
					return tab.hash === hash
				})
			},
			activateTab(tab) {
				this.activeTab = tab
				this.$emit('tab_active', tab)
			},
			windowHashToTab() {
				const tab = this.getTabByHash(this.windowHash)
				if (tab) {
					this.activateTab(tab)
				}
			}
		},
		created() {
			if(!this.noHash){
				window.addEventListener("hashchange", this.windowHashToTab, false)
			}
		},
		beforeDestroy() {
			if(!this.noHash) {
				window.removeEventListener("hashchange", this.windowHashToTab, false)
			}
		},
		mounted() {
			//Load Tab from Hash
			this.activateTab(this.defaultTab)
		},
	}
</script>
<template>
	<div class="v-tabs card card-light border-0 d-flex flex-column">
		<div class="card-header d-flex flex-row flex-grow-0 bg-light rounded-0">
			<ul class="nav nav-pills card-header-pills">
				<li v-for="(tab, index) in tabs" class="nav-item">
					<a
						@click.prevent="activateTab(tab)"
						:href="'#'+tab.hash"
						:class="{
	            'active' : isActive(tab),
	            'text-white bg-danger' : isActive(tab) && tab.error,
	            'text-danger' : !isActive(tab) && tab.error,
            }"
						class="nav-link small"
					>
						<i v-if="tab.error" class="fa fa-info-circle"></i>
						<i v-else-if="tab.icon" :class="`fa ${tab.icon}`"></i>
						<div :class="tab.icon ? 'd-none d-md-inline' : ''">
							{{ tab.name }}
						</div>
					</a>
				</li>
			</ul>
		</div>
		<transition
			name="tabs"
			mode="out-in"
			enter-active-class="animated tabs-transition fadeInRight"
			leave-active-class="animated tabs-transition fadeOutLeft"
		>
			<slot :name="activeTab.hash">{{ activeTab.hash }}</slot>
		</transition>
		<div class="card-footer d-flex flex-row flex-grow-0" v-if="hasSlot('default')">
			<slot name="default"></slot>
		</div>
	</div>
</template>
<style lang="sass">
.animated.tabs-transition
	animation-duration: 300ms !important
.v-tabs
	.card-header-pills
		.nav-link
			transition: all ease-out 300ms
			margin-right: 0.5em !important
			&:last-of-type
				margin: 0
</style>