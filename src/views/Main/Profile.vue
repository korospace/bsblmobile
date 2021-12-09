<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    
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
            <button v-on:click="logOut()">Logout mhanx</button>
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
      // console.log('Begin async operation');
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
    createSpinner: function () {
      return loadingController
      .create({
        spinner: 'crescent',  
        message: 'Tunggu sebentar...',
        translucent: true,
        // cssClass: 'custom-class custom-loading',
        backdropDismiss: false
      });
    },
    getProfile : async function() {
      const loading = await this.createSpinner();
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
          this.userid = response.data.data.userid;
          console.log(response.data.data.userid);
          
        })
        .catch(error => {
          console.log(error);
          loading.dismiss();
        })
    },
    logOut : function() {
      TokenService.removeToken();
      window.location.reload();
    }
  },
  mounted(){
      this.getProfile();
  },
});
</script>
<style scoped>
  
</style>