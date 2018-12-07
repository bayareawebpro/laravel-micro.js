<script>
	import DetectsViewPort from '../Mixins/DetectsViewPort'
	export default {
		mixins: [DetectsViewPort],
		name: 'v-offcanvas',
		props: {
			event: {type: String, default: 'toggle:offcanvas'},
			width: {type: Number, default: 300},
		},
		data() {
			return {
				left: false,
				right: false,
				containerClass: 'justify-content-start',
				leftEase: 'ease-in-out',
				rightEase: 'ease-in-out',
				speed: 200
			}
		},
		watch:{
			'viewport.isSmall': {
				handler(){
					this.changeContainerClass()
				}
			}
		},
		computed: {
			pushStyles(){
				const width = this.rightWidth + this.leftWidth
				return {
					width: this.viewport.isSmall ? '100vw' : `calc(100vw - ${width}px)`,
					minWidth: this.viewport.isSmall ? '100vw' : `calc(100vw - ${width}px)`,
					transition: `all ${this.speed}ms ease-in-out`,
				}
			},
			menuClasses(){
				return 'v-offCanvas-menu flex-column flex-grow-0 bg-light border-right shadow-sm'
			},
			leftClasses(){
				return `${this.menuClasses} ${(this.left) ? 'v-offCanvas-open' : ''}`
			},
			rightClasses(){
				return `${this.menuClasses} ${(this.right) ? 'v-offCanvas-open' : ''}`
			},
			leftWidth(){
				return (this.left ? 155 : this.viewport.isSmall ? 0 : 55)
			},
			rightWidth(){
				return (this.right ? 155 : 0)
			},
			leftStyles(){
				return {
					width: `${this.leftWidth}px`,
					minWidth: `${this.leftWidth}px`,
					transition: `all ${this.speed}ms ease-in-out`
				}
			},
			rightStyles(){
				return {
					width: `${this.rightWidth}px`,
					minWidth: `${this.rightWidth}px`,
					transition: `all ${this.speed}ms ease-in-out`
				}
			}
		},
		methods: {
			toggle(side, state = null) {
				if(this.animating) return
				this.animating = true

				let time = 0
				state = state !== null ? state : !this[side]

				const other = side === 'left' ? 'right' : 'left'

				//If mobile, close other side first.
				if(this.viewport.isSmall) {
					if (this[other] === true) {
						this[other] = false
						time = this.speed
					}
				}
				//If mobile, wait to open new side.
				setTimeout(()=>{
					this[side] = state
					this.animating = false
					this.changeContainerClass()
				}, time)
			},
			changeContainerClass(){
				//If mobile, change flex-box justification so current menu can be seen.
				if(this.viewport.isSmall){
					if (this.left) {
						this.containerClass = 'justify-content-start'
					}else if (this.right) {
						this.containerClass = 'justify-content-end'
					}
				}else{
					this.containerClass = 'justify-content-start'
				}
			},
			close(){
				if(this.viewport.isSmall){
					this.left = false
					this.right = false
					setTimeout(()=>{ this.changeContainerClass()}, this.speed)
				}
			}
		},
		created() {
			this.$events = this.$app.make('Events')
			this.$events.$on('offcanvas:toggle', this.toggle)
			this.$events.$on('offcanvas:close:all', this.close)
		},
		beforeDestroy() {
			this.$events.$off('offcanvas:toggle', this.toggle)
			this.$events.$off('offcanvas:close:all', this.close)
		},
	}
</script>
<template>
		<div class="d-flex flex-row w-100" :class="containerClass">
			<div :class="leftClasses" :style="leftStyles">
				<slot name="left"></slot>
			</div>
			<div class="v-offCanvas-push" :style="pushStyles">
				<slot name="push"></slot>
			</div>
			<div :class="rightClasses" :style="rightStyles">
				<slot name="right">
					<div><h1>asd</h1></div>
				</slot>
			</div>
		</div>
</template>
<style lang="sass">
.v-offCanvas-menu
	overflow: hidden
	overflow-y: scroll
	li a
		white-space: nowrap
		span.item-text
			display: none
	&.v-offCanvas-open
		li a
			span.item-text
				display: inline-block
</style>

