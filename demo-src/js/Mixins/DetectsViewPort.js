
export default {
    data(){
        return {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                isSmall: window.innerWidth <= 576,
                isMedium: window.innerWidth >= 768,
                isLarge: window.innerWidth >= 992,
                isXL: window.innerWidth >= 1200,
            }
        }
    },
    methods:{
        _mix_viewport(){
            this.viewport = {
                width: window.innerWidth,
                height: window.innerHeight,
                isSmall: window.innerWidth <= 576,
                isMedium: window.innerWidth >= 768,
                isLarge: window.innerWidth >= 992,
                isXL: window.innerWidth >= 1200,
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this._mix_viewport)
    },
    beforeDestroy(){
        window.removeEventListener('resize', this._mix_viewport)
    }
}
