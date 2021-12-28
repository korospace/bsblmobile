<template>
    <div class="flex justify-center">
        <div id="myMoney" class="tabcontent w-1/2 h-48 my-6 bg-red-100">
            
        </div>
    </div>
    <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-4 place-content-center h-48">
            <div class="flex justify-center bg-red-500">
                01
            </div>
            <div class="flex justify-center bg-green-500">
                02
            </div>
            <div class="flex justify-center bg-blue-500">
                03
            </div>
            <div class="flex justify-center bg-yellow-500">
                04
            </div>
        </div>
    </div>
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