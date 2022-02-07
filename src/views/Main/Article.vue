<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div 
        id="container"
        class="min-h-full pb-6 relative bg-gradient-to-t from-lime-700 to-lime-400">

          <!-- // header // -->
          <x-header :title="'Berita Dan Info Sampah'" />
          
          <!-- // articles // -->
          <div class="px-4 my-6 bg-red-100 relative">
            
            <!-- Template card - Jangan dihapus -->
            <!-- <div class="rounded-xl overflow-hidden w-full">
              <div class="w-full bg-white">
                <img src="@/assets/images/default-thumbnail.jpg" alt="" class="loginLogo rounded-b-xl w-full">
              </div>
              <div class="bg-white px-4 pt-3 pb-10 text-left text-sm" >
                <span style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, nisi.
                </span>
              </div>
            </div> -->

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

<script>
  import { IonPage,IonContent,onIonViewWillEnter} from '@ionic/vue';
  import { ref, computed, defineComponent } from 'vue';
  import { useStore }        from 'vuex'
  import xHeader             from "@/components/dashboard.header.vue";

  export default defineComponent({
    components: {
      IonContent,
      IonPage,
      xHeader,
    },
    setup() {
      const store = useStore();

      const articles = computed(() => {
        return store.state.dataArticles;
      });

      onIonViewWillEnter(() => {
        store.commit("setDataArticles","");
        store.dispatch("getArticles");
        // if (!articles.value) {
        //   store.commit("setDataArticles","");
        //   store.dispatch("getArticles");
        // }
      })

      return { 
        articles,
      }
    }
  });
</script>

<style scoped>
  
</style>