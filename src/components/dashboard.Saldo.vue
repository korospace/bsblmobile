<template>
  <transition name="fade">
    <div
      v-if="currentTab == 'saldo saya'"
      class="tabcontent text-white pb-6">

        <!-- ID Card -->
        <div id="idcard-container" class="px-6 relative" :class="{'animate-pulse':!username}">
            <div 
              id="idcard-skeleton" 
              class="absolute z-10 top-0 bottom-0 right-6 left-6 bg-lime-400 rounded-md"
              :class="{'hidden':username}"></div>
            <div
              id="idcard" 
              class="rounded-md overflow-hidden">
                <div id="bg-idcard" class="p-4" style="background: rgba(0,0,0,0.2);">
                  <div class="flex justify-between">
                    <font-awesome-icon
                    :icon="faWifi" size="1x"
                    class=""/>

                    <img src="@/assets/images/banksampah-logo.png" alt="" class="loginLogo w-12 opacity-80">
                  </div>

                  <p class="mt-4" v-html="idNasabah"></p>

                  <div class="flex mt-8">
                    <div class="mr-6">
                      <p class="text-xs tracking-widest opacity-80">Username</p>
                      <p class="text-lg mt-2">
                        {{ username }}
                      </p>
                    </div>
                    <div>
                      <p class="text-xs tracking-widest opacity-80">Tgl Bergabung</p>
                      <p class="text-lg mt-2">
                        {{ bergabung }}
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        <!-- Saldo -->
        <div id="saldo-container" class="flex px-6 mt-6">
          <div
            class="flex-1 mr-1 bg-white flex flex-col items-center rounded-md py-3 px-5 overflow-hidden relative"
            :class="{'animate-pulse':saldoUang == ''}">
              <div 
                class="absolute z-10 top-0 bottom-0 right-0 left-0 bg-lime-400 rounded-md"
                :class="{'hidden':saldoUang != ''}"></div>
              <div class="w-max rounded-lg p-5 bg-gradient-to-t from-lime-700 to-lime-400">
                <font-awesome-icon
                  :icon="faMoneyBillWaveAlt" size="1x"
                  class="text-white"/>
              </div>
              <p class="w-full mt-4 text-center text-gray-600 border-b border-gray-200 pb-2">Uang</p>
              <p class="text-gray-600 mt-4">
                Rp.{{ saldoUang }}
              </p>
          </div>

          <div 
            class="flex-1 ml-1 bg-white flex flex-col items-center rounded-md py-3 px-5 overflow-hidden relative"
            :class="{'animate-pulse':!saldoUang}">
              <div 
                class="absolute z-10 top-0 bottom-0 right-0 left-0 bg-lime-400 rounded-md"
                :class="{'hidden':saldoUang}"></div>
              <div class="w-max rounded-lg p-5 bg-gradient-to-t from-lime-700 to-lime-400">
                <font-awesome-icon
                  :icon="faCoins" size="1x"
                  class="text-white"/>
              </div>
              <p class="w-full mt-4 text-center text-gray-600 border-b border-gray-200 pb-2">Emas</p>
              <p class="text-gray-600 mt-4">
                {{ saldoEmas }} g
              </p>
          </div>
        </div>

        <!-- Sampah masuk -->
        <div
          v-if="!sampahMasuk"
          class="grid grid-cols-4 gap-2 place-content-center px-6 mt-6 text-white animate-pulse">
            <div
              v-for="data in [1,2,3,4]" :key="data"
              class="text-center rounded-lg h-28 bg-lime-400">
            </div>
        </div>
        <div
          v-if="sampahMasuk"
          class="grid grid-cols-4 gap-2 place-content-center px-6 mt-6 text-white">
            <div
              v-for="data in sampahMasuk" :key="data"
              class="text-center rounded-lg py-1.5 sm320:py-3 bg-gradient-to-t from-lime-700 to-lime-400">
                <div class="px-5">
                  <font-awesome-icon
                    :icon="faRecycle" size="1x"
                    class=""/>
                </div>
                <p class="mt-2 text-xxs sm320:text-xs">
                  {{ data.kategori }}
                </p>
                <p class="mt-2 border-b border-white opacity-40"></p>
                <p class="mt-2 text-xxs sm320:text-xs">{{ data.total }} kg</p>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue';
import { ref, computed }   from "vue";
import { useStore }        from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWifi,faCoins,faMoneyBillWaveAlt,faRecycle } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  components: {
    FontAwesomeIcon,
    faCoins,
    faMoneyBillWaveAlt,
    faRecycle
  },
  setup() {
    const store = useStore();

    const currentTab  = computed(() => {
      return store.state.currentDashboardTab;
    });

    const username = computed(() => {
      return store.state.dataNasabah.username;
    });

    const idNasabah = computed(() => {
      const id = (store.state.dataNasabah.id) ? store.state.dataNasabah.id : "";
      
      return `${id.slice(0, 5)}&nbsp;&nbsp;&nbsp;${id.slice(5, 9)}&nbsp;&nbsp;&nbsp;${id.slice(9,99999999)}`;
    });

    const bergabung = computed(() => {
      const createdAt = (store.state.dataNasabah.created_at)?store.state.dataNasabah.created_at:0;
      const date      = new Date(parseInt(createdAt) * 1000);
      
      return `${date.toLocaleString("en-US",{day: "numeric"})}/${date.toLocaleString("en-US",{month: "numeric"})}/${date.toLocaleString("en-US",{year: "numeric"})}`
    });

    const saldoUang = computed(() => {
      const uang = (store.state.dataSaldo.uang) ? store.state.dataSaldo.uang : ""; 
      return uang.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    });

    const saldoEmas = computed(() => {
      return store.state.dataSaldo.emas;
    });

    const sampahMasuk = computed(() => {
      return store.state.dataSampahMasuk;
    });

    return {
      faWifi,
      faCoins,
      faMoneyBillWaveAlt,
      faRecycle,
      currentTab,
      username,
      idNasabah,
      bergabung,
      saldoUang,
      saldoEmas,
      sampahMasuk
    }
  },
});
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

  #idcard{
    background: url('../assets/images/Card-Member.jpg') no-repeat center center;
  }
</style>