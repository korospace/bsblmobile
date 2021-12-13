<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item>
            <ion-label v-on:click="clickMe()">Pokémon Yellow</ion-label>
        </ion-item>
        <ion-item>
            <ion-label>Mega Man X</ion-label>
        </ion-item>
        <ion-item>
            <ion-label>The Legend of Zelda</ion-label>
        </ion-item>
        <ion-item>
            <ion-label>Pac-Man</ion-label>
        </ion-item>
    </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel , IonItem, IonRefresher, IonRefresherContent} from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import { TokenService } from '../../services/token.service';

export default defineComponent({
    name: 'Dashboard',
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonLabel,
        IonList,
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
    methods : {
      clickMe() {
        console.log(TokenService.getToken());
      }
    }
});
</script>