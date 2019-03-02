<template>
	<transition
		name="modal"
		mode="out-in"
		enter-active-class="animated modal-transition fadeInRight"
		leave-active-class="animated modal-transition fadeOutLeft"
	>
		<div v-if="isVisible" class="v-modal modal d-block" tabindex="-1" role="dialog"
		     :class="{'fullscreen rounded-0': fullscreen}" @click.stop="toggle">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document" @click.stop>
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title m-0 p-0">{{ title }}</h5>
						<slot name="header"></slot>
						<button class="btn btn-sm btn-secondary ml-2" @click.stop="toggle" aria-label="Close">
							<i class="fa fa-times"></i>
						</button>
					</div>
					<div class="modal-body d-block">
						<slot name="default"></slot>
					</div>
					<div class="modal-footer d-block" v-if="hasSlot('footer')">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		props: {
			title: {type: String, default: 'Modal'},
			value: {type: Boolean, default: false},
			event: {type: String, default: 'toggle:modal'},
			fullscreen: {type: Boolean, default: false},
		},
		data() {
			return {
				isVisible: this.value,
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(value) {
					this.toggle(value)
				}
			},
			isVisible: {
				immediate: true,
				handler(value) {
					this.$emit('input', value)
					if (value) {
						document.documentElement.classList.add('v-modal-open')
					} else {
						document.documentElement.classList.remove('v-modal-open')
					}
				}
			},
		},
		methods: {
			toggle(isVisible = null) {
				this.isVisible = typeof isVisible === 'boolean' ? isVisible : !this.isVisible
			},
			hasSlot(slot) {
				return !!this.$slots[slot]
			},
			onKeyDownEsc(event){
				const {key} = event
				if (key === "Escape") {
					this.toggle(false)
				}
			},
		},
		mounted() {
			this.$app.make('Events').$on(this.event, this.toggle)
			document.addEventListener('keydown', this.onKeyDownEsc)
		},
		beforeDestroy() {
			this.$app.make('Events').$off(this.event, this.toggle)
			document.removeEventListener('keydown', this.onKeyDownEsc)
		}
	}
</script>
<style lang="sass" scoped>
html.v-modal-open,
html.v-modal-open body
	overflow: hidden !important
.animated.modal-transition
	animation-duration: 600ms !important
.v-modal
	background: rgba(0, 0, 0, 0.7)
	padding: 0
	z-index: 99999 !important
.modal.show
	display: block
.modal-open.modal
	overflow-y: scroll !important
.fullscreen
	.modal-dialog
		width: 100vw !important
		height: 100vh !important
		max-width: 100vw
		margin: 0
		position: fixed
		.modal-header
			height: calc(70px - 20px) !important
			background: #f3f3f3
			padding: 10px 15px !important
		.modal-header,
		.modal-body,
		.modal-footer
			padding-left: 15px
			padding-right: 15px
		.modal-body
			overflow: hidden
			overflow-y: scroll
			height: 100% !important
			padding: 0
		.modal-content
			border: none
			border-radius: 0
			overflow-y: auto
			overflow-x: hidden
			height: 100vh !important
</style>
