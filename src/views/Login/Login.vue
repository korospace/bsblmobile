<template>
  <ion-page>
    <form action="" v-on:submit.prevent="logIn($event)">
      <ion-card>
        <ion-card-header>
            <ion-card-title>Masuk ke Akun Bank Sampah</ion-card-title>
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
      </ion-card>
    </form>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { IonPage, IonButton, IonCard, IonCardTitle, IonLabel, IonInput, IonItem, IonCardHeader, loadingController } from '@ionic/vue';
import { TokenService, getApiURL } from '../../services/token.service';

export default defineComponent({
  name: 'Login',
  components: { IonPage, IonButton, IonCard, IonCardTitle, IonCardHeader, IonLabel, IonInput, IonItem },
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