<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Artikel</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage,IonContent, } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
  },
  method: {

  }
});
</script>