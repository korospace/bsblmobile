<template>

    <transition name="fade">
        <div v-if="currentTab == 'transaksi'">
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
        </div>
    </transition>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, computed }   from "vue";
import { useStore }        from 'vuex'

export default defineComponent({
    name: 'tabMyMoney',
    components: {

    },
    setup() {
        const store = useStore();

        const currentTab = computed(() => {
        return store.state.currentDashboardTab;
        });

        return {
        currentTab
        }
    },
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
</style>