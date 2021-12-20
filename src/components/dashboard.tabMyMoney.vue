<template>
<transition name="fade">
    <div id="myMoney" class="tabcontent">
        <h3 style="color:white;">Duid Ngab</h3>
        <p>E for Error</p> 
    </div>
</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'tabMyMoney',
    components: {
    }
    // setup() {

    // }
})

</script>

<style scoped>
    .fade-enter-active{
        animation: fade .4s;
    }
    .fade-leave-active{
        animation: fade .2s reverse;
    }
    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .slide-enter-active{
        animation: slide-in .4s;
    }
    @keyframes slide-in {
        0% {
            opacity: 0;
            transform: translateX(14px)
        }
        100% {
            opacity: 1;
            transform: translateX(0px)
        }
    }
</style>