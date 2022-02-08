<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div 
        id="container"
        class="min-h-full flex flex-col relative bg-gradient-to-t from-lime-700 to-lime-400">

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
          <div class="mx-4 rounded-t-3xl shadow-lg bg-white flex-1">
            <div 
              class="font-bold text-md p-6 text-gray-600 border-b border-gray-200"
              style="font-family:QuicksandSemiBold;">
                Harga Sampah Terkini
            </div>
            <div class="table p-6 w-full">
              <!-- skeleton jenis sampah -->
              <template
                v-if="jenisSampah == ''">
                  <div
                    v-for="x in [1,2,3,4]" :key="x"
                    class="mb-4 animate-pulse">
                      <div class="h-5 w-20 bg-gray-400 rounded-md mb-4">
                      </div>
                      <div
                        v-for="y in [1,2,3]" :key="y"
                        class="text-sm text-gray-700 capitalize pl-4 py-2 flex justify-between">
                          <div class="h-3 w-28 bg-gray-400 rounded-sm">
                          </div>
                          <div class="h-3 w-28 bg-gray-400 rounded-sm">
                          </div>
                      </div>
                  </div>
              </template>

              <template
                v-if="jenisSampah !== ''">
                  <div
                    v-for="(itemA,name,noA) in jenisSampah" :key="itemA"
                    class="mb-4">
                      <div class="text-gray-700 text-md uppercase font-bold">
                        {{ ++noA }}. {{ name }}
                      </div>
                      <div
                        v-for="(itemB,noB) in itemA" :key="itemB"
                        class="text-sm text-gray-700 capitalize pl-4 py-2 flex justify-between">
                          <div>
                            {{ noA }}.{{ ++noB }} {{ itemB.jenis }}
                          </div>
                          <div>
                            Rp. {{ modifHarga(itemB.harga) }}
                          </div>
                      </div>
                  </div>
              </template>
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

      const jenisSampah = computed(() => {
        const sampah = store.state.dataJenisSampah;

        if (sampah == "") {
          return "";
        } 
        else {
          const arrKategori = [];
          const objSampah   = {};
          const newArrSampah= [];
          
          // create array kategori
          sampah.forEach(d => {
              if (!arrKategori.includes(d.kategori)) {
                  arrKategori.push(d.kategori.replace(/\s/g,'_'));
              }
          });
  
          arrKategori.forEach(aK => {
              objSampah[aK] = sampah.filter((d) => {
                  return d.kategori == aK.replace(/_/g,' ');
              })
          });
  
          return objSampah;
        }
      });

      const modifHarga = (value) => {
        return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      };

      onIonViewWillEnter(() => {
        if (!store.state.dataNasabah) {
          store.commit("setDataArticles","");
          store.dispatch("getArticles");
          store.commit("setDataJenisSampah","");
          store.dispatch("getJenisSampah");
        }
      })

      return { 
        articles,
        jenisSampah,
        modifHarga
      }
    }
  });
</script>

<style scoped>
  
</style>