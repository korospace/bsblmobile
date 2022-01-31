<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div 
        id="container"
        class="min-h-full pb-6 relative bg-gradient-to-t from-lime-700 to-lime-400">

        <!-- // header // -->
          <div class="bg-white p-6 rounded-b-3xl flex items-center relative z-20">
            <img src="@/assets/images/banksampah-logo.png" alt="" class="loginLogo w-20">
            <p
              class="flex-1 text-xl capitalize text-center"
              style="font-family:QuicksandSemiBold;background: linear-gradient(to right, #BFD765, #81A257);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
                Bank Sampah Budi Luhur
            </p>
          </div>

          <!-- // article card // -->
          <div class="mx-4 my-2">
            <p class="text-gray-100">Artikel Terbaru</p>
            <div class="rounded-lg shadow-lg bg-white">
              <img class="w-full rounded-lg" src="@/assets/images/Card-Member.jpg">
              <div class="px-6 py-4">
                <div class="font-bold mb-1">Title</div>
                <p class="text-gray-700 text-xs">
                  Caption here
                </p>
              </div>
            </div>
          </div>

          <!-- // info harga sampah terkini // -->
          <div class="mx-4 my-4 py-4 rounded-lg shadow-lg bg-white">
            <div class="font-bold text-sm px-4 py-2 text-gray-600">
              Harga Sampah Terkini
            </div>
            <hr color="gray">
            <div class="table mx-4 px-4 w-full">
              <div class="table-header-group">
                <div class="table-row">
                  <div class="table-cell text-left text-base text-gray-700">Jenis Sampah</div>
                  <div class="table-cell text-left text-base text-gray-700">Harga</div>
                </div>
              </div>
              <div class="table-row-group">
                <div class="text-gray-700 text-sm font-bold uppercase">
                  Kertas
                </div>
                <div class="table-row">
                  <div class="table-cell text-xs text-gray-700">Kardus</div>
                  <div class="table-cell text-xs text-gray-700">2.2000</div>
                </div>
                <div class="table-row">
                  <div class="table-cell text-xs text-gray-700">Koran</div>
                  <div class="table-cell text-xs text-gray-700">2000</div>
                </div>
              </div>
            </div>
          </div>
          
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage,IonContent, } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
  },
  method: {

  }
});
</script>