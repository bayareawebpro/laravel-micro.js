<script>
import DetectsViewPort from '../Mixins/DetectsViewPort'
export default {
    mixins:[DetectsViewPort],
    name: 'v-offcanvas',
    props:{
        value: {type: Boolean, default: false},
        event: {type: String, default: 'toggle:offcanvas'},
        width: {type: Number, default: 200},
        side: {type: String, default: 'left'},
    },
    data(){
        return {
            isVisible: this.value,
        }
    },
    watch:{
        value:{
            handler(value){
                this.isVisible = value
            }
        },
        isVisible: {
            handler(value){
                this.$emit('input', value)
                document.documentElement.classList.toggle('scroll-freeze')
                document.body.scrollTo(0, 0);
            }
        }
    },
    computed:{
        menuStyles:{
            cache:false,
            get(){
                const menuWidth = this.viewport.isSmall ? 55 : 60
                return {
                    minWidth: (this.isVisible ? this.width : menuWidth) + 'px',
                    width: (this.isVisible ? this.width : menuWidth) + 'px',
                    left: this.side === 'left' ? 0 : 'auto',
                    right: this.side === 'right' ? 0 : 'auto',
                }
            }
        }
    },
    methods:{
        toggle(value = null) {
            this.isVisible = value !== null ? value : !this.isVisible
        }
    },
    created(){
        const Events = this.$app.make('Events')
        Events.$on(this.event, this.toggle)
        Events.$on('offcanvas:close:all', () => this.toggle(false))
    },
    beforeDestroy(){
        const Events = this.$app.make('Events')
        Events.$off(this.event, this.toggle)
        Events.$off('offcanvas:close:all', () => this.toggle(false))
    },
}
</script>
<template>
    <div class="d-inline-flex flex-row w-100 overflow-hidden">
        <div :style="menuStyles"
             :class="{'v-offcanvas-reveal': isVisible}"
             class="v-offcanvas-menu flex-grow-0 border-right">
            <slot name="default"></slot>
        </div>
        <div class="v-offcanvas-push flex-grow-1">
            <div style="display: block !important; flex: none !important;">
                <slot name="push"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="sass" scoped>
.v-offcanvas-menu
    overflow: hidden
    z-index: 1
    opacity: 1
    transition: all 300ms ease-in-out

.v-offcanvas-push
    transition: all 300ms ease-in-out

/*.offcanvas-left-enter,*/
/*.offcanvas-left-leave-active,*/
/*.offcanvas-right-enter,*/
/*.offcanvas-right-leave-active*/
    /*opacity: 1*/
    /*transform: translateX(0)*/
/*.offcanvas-right-enter,*/
/*.offcanvas-right-leave-active*/
    /*transform: translateX(100%)*/
</style>
<style lang="sass">
.v-offcanvas-menu
    li a
        white-space: nowrap
        span
            display: none
.v-offcanvas-reveal
    li a span
        display: inline-block
/*html.scroll-freeze,*/
/*html.scroll-freeze body*/
    /*overflow: hidden*/
</style>

