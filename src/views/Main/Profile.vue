<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="list ion-margin">
        <ion-item>
          <ion-label>
            {{name}}
          </ion-label>
        </ion-item>
      </div>
      <div class="list ion-margin">
        <ion-item>
          <ion-label>
            {{email}}
          </ion-label>
        </ion-item>
      </div>
      <div class="list ion-margin">
        <ion-item>
          <ion-label>
            {{userid}}
          </ion-label>
        </ion-item>
      </div>
      <div class="ion-margin">
        <ion-button expand="block" fill="outline" class="padding" v-on:click="logOut()">Logout</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { getApiURL, TokenService } from '@/services/token.service';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonRefresher, IonRefresherContent  } from '@ionic/vue';
import { loadingController } from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import axios from 'axios';
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonRefresher, 
    IonRefresherContent
  },
  setup() {
    const doRefresh = (event: any) => {
      window.location.reload()
      event.target.complete();
    };
    return { chevronDownCircleOutline, doRefresh };
  },
  data(){
     return{
      name: "Nama",
      email: "Email",
      userid: "UserID"
    }
  },
  methods: {
    createSpinner: function (messages: string) {
      return loadingController
      .create({
        spinner: 'crescent',  
        message: messages,
        translucent: true,
        // cssClass: 'custom-class custom-loading',
        backdropDismiss: false
      });
    },
    getProfile : async function() {
      const loading = await this.createSpinner('Silahkan Tunggu...');
      loading.present();
      axios.get(`${getApiURL}/nasabah/getprofile`,{
        headers: {
            token: TokenService.getToken()!
          }
      })
      .then(response => {
        loading.dismiss();

        this.name   = response.data.data.nama_lengkap;
        this.email  = response.data.data.email;
        this.userid = response.data.data.id;
        
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      })
    },
    logOut : async function() {
      const loading = await this.createSpinner('Keluar...');
      loading.present();
      axios.delete(`${getApiURL}/nasabah/logout`, {
        headers: {
            token: TokenService.getToken()!
        }
      }).then(() => {
          loading.dismiss();
          TokenService.removeToken();
          router.push('/login');
      }).catch(error => {
        loading.dismiss();
        console.log(error);
        console.log('Lho kok eror');
      })
    }
  },
  mounted(){
    this.getProfile();
  },
});
</script>
<style scoped>
  
</style>