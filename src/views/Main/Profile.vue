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
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { getApiURL, TokenService } from '@/services/token.service';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';

const TOKEN = TokenService.getToken();
axios.get(`${getApiURL}/nasabah/getprofile`,{headers: {token: TOKEN!}})
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
}) 

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  }
});
</script>