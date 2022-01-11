<template>
  <ion-page>
    <form @submit.prevent="doLogin">
        <ion-card class="center w-11/12">
          <ion-card-header>
              <center>
                <img src="../assets/images/banksampah-logo.png" alt="" class="loginLogo w-28">
              </center>
          </ion-card-header>
          
          <ion-item class="mt-2">
              <ion-label position="floating">Username or Email</ion-label>
              <ion-input type="text" name="username_or_email"></ion-input>
          </ion-item>
          <small v-if="usernameOrEmailWrong" class="mt-1 tracking-wide text-red-500">
            Username/email tidak terdaftar
          </small>

          <ion-item class="mt-4">
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" name="password"></ion-input>
          </ion-item>
          <small v-if="passwordWrong" class="mt-1 tracking-wide text-red-500">
            Password salah
          </small>

          <ion-button class="mt-8" expand="block" fill="outline" type="submit">Login</ion-button>
          
          <center class="mt-4 pb-4">
            <router-link to="/register" class="text-xs text-lime-500 border-b border-lime-500">
              daftar sekarang
            </router-link>
          </center>
        </ion-card>
    </form>
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonCard, IonLabel, IonInput, IonItem, IonCardHeader, loadingController } from '@ionic/vue';
import axios               from 'axios';
import { defineComponent } from 'vue'
import { ref,reactive }    from "vue";
import { useRouter }       from 'vue-router';
import { useStore }        from "vuex"
import { TokenService }    from '@/services/token.service';

export default defineComponent({
  components: { IonPage, IonButton, IonCard, IonCardHeader, IonLabel, IonInput, IonItem },
  setup() {
    const router = useRouter();
    const store  = useStore();
    const usernameOrEmailWrong = ref(false);
    const passwordWrong = ref(false);

    // -- loading spinner --
    const createSpinner = () => {
      return loadingController
        .create({
          spinner: "crescent",
          message: '',
          translucent: true,
          cssClass: 'rounded-xl',
          backdropDismiss: false
        });
    }

    const doLogin = async (event) => {
      const loading   = await createSpinner();
      const formLogin = new FormData(event.target); 
      usernameOrEmailWrong.value = false;
      passwordWrong.value = false;
            
      if (formLogin.get('username_or_email') == "" || formLogin.get('password') == "") {
        return 0;
      }

      loading.present();

      axios
        .post(`${store.state.APIURL}/login/nasabah`, formLogin)
        .then((response) => {
          loading.dismiss();
          TokenService.saveToken(response.data.token);
          router.push("/tabs/dashboard");
        })
        .catch((error) => {
          loading.dismiss();

          // bad request
          if (error.response.status == 404) {
              if (error.response.data.messages.username_or_email) {
                  usernameOrEmailWrong.value = true;
              }
              if (error.response.data.messages.password) {
                  passwordWrong.value = true;
              }
          }
          // akun not verift
          else if (error.response.status == 401) {
              if (error.response.data.messages == 'account is not verify') {
                store.commit('setDataAlert',{show:true,type:'warning',message:`<b>Ups...</b> akun anda belum terveirifikasi`});
                store.commit('setDataLogin',{username_or_email:formLogin.get('username_or_email'),password:formLogin.get('password')});

                setTimeout(() => {
                    store.commit('setDataAlert',{show:false,type:'',message:``});
                    
                    setTimeout(() => {
                        router.push('/otp');
                    }, 500);
                }, 3000);
              }
          }
          // error server
          else if (error.response.status == 500) {
              store.commit('setDataAlert',{show:true,type:'danger',message:`<b>terjadi kesalahan.</b> silahkan coba lagi`});

              setTimeout(() => {
                  store.commit('setDataAlert',{show:false,type:'',message:``});
              }, 5000);
          }
        })
      }

    return {
      usernameOrEmailWrong,
      passwordWrong,
      doLogin,
    };
  },
})
</script>
<style scoped>
  .ion-page {
    background: url('../assets/images/Login.jpg') no-repeat center center fixed !important;
    background-size: cover !important;
  }
  .center {
    margin: 0;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 14px;
  }
</style>