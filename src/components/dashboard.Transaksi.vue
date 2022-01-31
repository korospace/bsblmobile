<template>
    <transition name="fade">
        <div v-if="currentTab == 'transaksi'">

            

        </div>
    </transition>
</template>

<script lang="ts">
import { ref, reactive, computed, onMounted }   from "vue";
import { defineComponent } from 'vue';
import { useStore }        from 'vuex';


export default defineComponent({
    components: {
        
    },
    setup() {
        const store   = useStore();
        
        const currentTab = computed(() => {
            return store.state.currentDashboardTab;
        });

        return {
            currentTab,
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