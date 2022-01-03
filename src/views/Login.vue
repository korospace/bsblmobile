<template>
  <ion-page>
    <form class="" v-on:submit.prevent="logIn($event)">
      <ion-card class="center w-11/12">
        <ion-card-header>
            <center>
              <img src="../assets/images/banksampah-logo.png" alt="" class="loginLogo w-28">
              <h3>Selamat Datang</h3>
            </center>
        </ion-card-header>
        <ion-item class="mt-2">
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" name="email" v-on:click="checkAgain()" required></ion-input>
            <small style="color:red;">{{err}}</small>
        </ion-item>
        <ion-item class="mt-4">
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" name="password" required></ion-input>
        </ion-item>
        <ion-button class="mt-8" expand="block" fill="outline" type="submit">Login</ion-button>
        <center class="mt-8 pb-4">
          <p class="text-md">tidak memiliki akun?</p>
          <router-link class="text-xs" to="/register">daftar sekarang</router-link>
        </center>
      </ion-card>
    </form>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import { IonPage, IonButton, IonCard, IonLabel, IonInput, IonItem, IonCardHeader, loadingController } from '@ionic/vue';
import { TokenService, getApiURL } from '@/services/token.service';

export default defineComponent({
  name: 'Login',
  components: { IonPage, IonButton, IonCard, IonCardHeader, IonLabel, IonInput, IonItem },
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  data(){
     return{
      err : ""
    }
  },
  methods : {
    createSpinner: function () {
      return loadingController
      .create({
        spinner: "crescent",
        message: 'Silahkan tunggu...',
        translucent: true,
        // cssClass: 'rounded-xl',
        backdropDismiss: false
      });
    },
    logIn: async function(event: any) {
      const loading = await this.createSpinner();
    
      const formLogin = new FormData(event.target);

      loading.present();
      axios.post(`${getApiURL}/login/nasabah`, formLogin)
      .then((response) => {
        TokenService.saveToken(response.data.token);
        this.router.push("/tabs/dashboard");
        window.location.reload();
        loading.dismiss();
      })
      .catch((error) => {
        this.err = error;
        console.log(error);
        loading.dismiss();
      })
    },
    checkAgain: function () {
      this.err = "";
    }
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