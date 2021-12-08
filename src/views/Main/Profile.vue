<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
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
            Item 3
          </ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { getApiURL, TokenService } from '@/services/token.service';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem } from '@ionic/vue';
import { loadingController } from '@ionic/vue';
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
    IonItem
  },
  data(){
     return{
      name: "Nama",
      email: "Email"
    }
  },
  methods: {
    createSpinner: function () {
      return loadingController
      .create({
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

          this.name  = response.data.data.nama_lengkap;
          this.email = response.data.data.email;
        })
        .catch(error => {
          loading.dismiss();
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