<script>
export default{}
</script>
<template>
    <div class="d-flex flex-column h-100 w-100">
        <div class="h-100 w-100 d-flex justify-content-center align-items-center bg-light position-absolute sticky" style="z-index: 1000">
            <div class="m-3 d-block text-primary text-center">
                <i class="fa fa-circle-notch fa-spin fa-2x"></i><br>
                Fetching awesomeness...
            </div>
        </div>
    </div>
</template>
<style lang="sass">
html,body
    height: 100vh !important
    overflow-x: hidden
.router-link-active,
.router-link-exact-active
    font-weight: bold !important
.animated.fast
    animation-duration: 160ms !important
</style>
