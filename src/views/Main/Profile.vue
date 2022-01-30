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
                personal information
            </p>
          </div>

          <!-- Image Profile -->
          <div
            id="containerImgProfile"
            class="h-36 rounded-b-2xl absolute top-16 left-0 right-0">
              <div
               class="rounded-xl absolute left-6 right-6 -bottom-10 p-2 shadow-xl flex"
               style="background: rgba(255,255,255,0.8);">
                <div class="bg-gray-400 rounded-md w-max">
                  <img src="@/assets/images/Person-Logo.png" alt="" class="loginLogo w-16">
                </div>
                <p
                  class="ml-4 flex flex-col justify-center"
                  :class="{'opacity-0': false}"
                  style="font-family:QuicksandSemiBold;">
                    <span class="text-lg text-gray-500">
                        {{ profileEmail }}
                    </span> 
                    <span class="text-sm text-gray-400 mt-1">
                        ID: <span class="tracking-widest">{{ profileId }}</span>
                    </span>
                </p>
              </div>
          </div>

          <div class="mt-40 px-6">
            <div
              class="pt-3 pb-4 px-4 bg-white shadow-xl rounded-xl"
              style="background: rgba(255,255,255,0.7);">

                <div class="flex justify-end mb-4">
                  <div class="bg-gray-100 text-gray-500 w-max px-2 py-1 shadow-lg rounded-md">
                    <font-awesome-icon
                      :icon="faUserEdit" size="1x"
                      class=""/>
                  </div>
                </div>

                <!-- Nama lengkap -->
                <small class="text-sm text-gray-400">
                  Nama lengkap</small>
                <div class="flex mt-1.5 text-lg text-gray-600 capitalize mb-4">
                  <div class="bg-gradient-to-t from-lime-700 to-lime-400 pl-1 opacity-70"></div>
                  <div class="py-2 px-3">{{ dataNasabah.nama_lengkap }}</div>
                </div>

                <!-- Username -->
                <small class="text-sm text-gray-400">
                  Username</small>
                <div class="flex mt-1.5 text-lg text-gray-600 mb-4">
                  <div class="bg-gradient-to-t from-lime-700 to-lime-400 pl-1 opacity-70"></div>
                  <div class="py-2 px-3">{{ dataNasabah.username }}</div>
                </div>

                <!-- Tgl lahir -->
                <small class="text-sm text-gray-400">
                  Tanggal lahir</small>
                <div class="flex mt-1.5 text-lg text-gray-600 capitalize mb-4">
                  <div class="bg-gradient-to-t from-lime-700 to-lime-400 pl-1 opacity-70"></div>
                  <div class="py-2 px-3">{{ dataNasabah.tgl_lahir }}</div>
                </div>

                <!-- Jenis kelamin -->
                <small class="text-sm text-gray-400">
                  Jenis kelamin</small>
                <div class="flex mt-1.5 text-lg text-gray-600 capitalize mb-4">
                  <div class="bg-gradient-to-t from-lime-700 to-lime-400 pl-1 opacity-70"></div>
                  <div class="py-2 px-3">{{ dataNasabah.kelamin }}</div>
                </div>

                <!-- No.telp -->
                <small class="text-sm text-gray-400">
                  No.telp</small>
                <div class="flex mt-1.5 text-lg text-gray-600 capitalize mb-4">
                  <div class="bg-gradient-to-t from-lime-700 to-lime-400 pl-1 opacity-70"></div>
                  <div class="py-2 px-3">{{ dataNasabah.notelp }}</div>
                </div>

                <!-- NIK -->
                <small class="text-sm text-gray-400">
                  NIK</small>
                <div class="flex mt-1.5 text-lg text-gray-600 capitalize mb-4">
                  <div class="bg-gradient-to-t from-lime-700 to-lime-400 pl-1 opacity-70"></div>
                  <div class="py-2 px-3">{{ dataNasabah.nik }}</div>
                </div>

                <!-- Alamat -->
                <small class="text-sm text-gray-400">
                  Alamat</small>
                <div class="flex mt-1.5 text-lg text-gray-600 capitalize">
                  <div class="bg-gradient-to-t from-lime-700 to-lime-400 pl-1 opacity-70"></div>
                  <div class="py-2 px-3">{{ dataNasabah.alamat }}</div>
                </div>
            </div>
          </div>

          <div class="mt-6 text-center text-lg">
            <a href="" class="text-white" @click.prevent="logout">
              <font-awesome-icon
                :icon="faSignOutAlt" size="1x"
                class=""/>
              <span class="ml-1.5 tracking-widest">keluar</span>
            </a>
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { IonContent, IonPage  } from '@ionic/vue';
import { TokenService }    from '@/services/token.service';
import axios               from 'axios';
import { useStore }        from 'vuex'
import { useRouter }       from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    FontAwesomeIcon
  },
  setup() {
    const store  = useStore();
    const router = useRouter();

    const dataNasabah = computed(() => {
      return store.state.dataNasabah;
    })

    const profileEmail = computed(() => {
      return dataNasabah.value.email;
    })

    const profileId = computed(() => {
      return dataNasabah.value.id;
    })

    const logout = () => {
      store.commit("setShowLoading",{show:true,text:"Logout"});

      axios.delete(`${store.state.APIURL}/nasabah/logout`, {
        headers: {
            token: TokenService.getToken()
        }
      })
      .then(() => {
          store.commit("setShowLoading",{show:false,text:""});
          TokenService.removeToken();
          router.push('/login');
      })
      .catch(error => {
          console.log(error);
          console.log('Lho kok eror');
      })
    }

    return { 
      dataNasabah,
      profileEmail,
      profileId,
      faSignOutAlt,
      faUserEdit,
      logout
    };
  },
});
</script>

<style scoped>
  #containerImgProfile{
    background: url('../../assets/images/Card-Member.jpg') no-repeat center center;
  }
</style>