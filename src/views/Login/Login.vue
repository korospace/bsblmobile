<template>
  <ion-page>
    <form action="" v-on:submit.prevent="logIn($event)">
      <ion-card class="center">
        <ion-card-header>
            <center>
              <img src="assets/images/banksampah-logo.png" alt="" class="loginLogo">
              <h3>Selamat Datang</h3>
            </center>
        </ion-card-header>
        <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" name="email" v-on:click="checkAgain()" required></ion-input>
            <small style="color:red;">{{err}}</small>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" name="password" required></ion-input>
        </ion-item>
        <ion-button expand="block" fill="outline" type="submit">Login</ion-button>
        <center>
          <small class="signup">tydac punya akun? yhahaha... 
            <br>
            <a href="/signup">daftar sekarang</a></small>
            <br><br>
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
import { TokenService, getApiURL } from '../../services/token.service';

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
        // cssClass: 'custom-class custom-loading',
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
        console.log(response);
        this.router.push("/tabs/dashboard");
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
<style>
  body {
    background: url('../../../public/assets/images/Login.jpg') no-repeat center center fixed !important;
    background-size: cover !important;
  }
  ion-item {
    margin-bottom: 5px;
  }
  .loginLogo {
    width: 100px;
  }
  .center {
    max-width: 300px;
    min-width: 250px;
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