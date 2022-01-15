<template>
  <ion-page>    
    <ion-content :fullscreen="true">
      <div
        id="container"
        class="min-h-full bg-gradient-to-t from-lime-600 to-lime-400">
          
          <!-- // header // -->
          <div class="bg-white px-6 pt-6 pb-12 mb-14 rounded-b-3xl relative">
            
            <!-- Icon -->
            <div class="flex items-center">
              <img src="@/assets/images/banksampah-logo.png" alt="" class="loginLogo w-20">
              <p
                class="text-lime-500 flex-1 capitalize text-center"
                :class="{'opacity-0': !username}">
                  <span
                    class="text-sm">
                      Hi, {{ username }}
                  </span> 
                  <br>
                  <span class="text-lg">
                    Selamat datang !
                  </span>
              </p>
            </div>

            <!-- Toggle Switch -->
            <div class="absolute -bottom-5 left-0 right-0 px-6">
              <div
                id="toggle-wraper"
                class="w-full bg-gray-300 flex rounded-md relative px-1"
                style="box-shadow: inset 0 0 4px 0px rgba(0, 0, 0, 0.3);">
                  <button
                    id="toggle"
                    class="absolute left-0 transform h-full w-1/2 text-white capitalize tracking-widest bg-lime-600 transition duration-200 rounded-md"
                    :class="{'translate-x-full':currentTab == 'transaksi'}">
                      {{ currentTab }}
                  </button>
                  
                  <button
                    class="flex-1 py-3.5 text-gray-500 capitalize text-center outline-none"
                    @click="switchTab('saldo saya')">
                      saldo saya
                  </button>
                  <button
                    class="flex-1 py-3.5 text-gray-500 capitalize text-center outline-none"
                    @click="switchTab('transaksi')">
                      transaksi
                  </button>
              </div>
            </div>
          </div>
          
        
          <saldo />
          <transaksi />

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, computed, onBeforeMount } from 'vue';
import {IonPage, IonRefresher, IonRefresherContent} from '@ionic/vue';
import { useStore } from 'vuex'
import Saldo        from '@/components/dashboard.Saldo.vue'
import Transaksi    from '@/components/dashboard.Transaksi.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    IonPage,
    IonRefresher, 
    IonRefresherContent,
    Saldo,
    Transaksi
  },
  setup() {
    const store    = useStore();
    
    const currentTab = computed(() => {
      return store.state.currentDashboardTab;
    });

    const switchTab  = (text) => {
      store.commit('setDashboardTab',text);
    }

    const username = computed(() => {
      return store.state.dataNasabah.username;
    });

    return { 
      currentTab,
      switchTab,
      username, 
    };
  },
});
</script>

<style>
  
</style>