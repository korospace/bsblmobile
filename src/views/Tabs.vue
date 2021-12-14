<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/dashboard">
          <font-awesome-icon :icon="faHouseUser" size="2x"/>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/artikel">
          <font-awesome-icon :icon="faPencilAlt" size="2x"/>
          <ion-label>Artikel</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/profile">
          <font-awesome-icon :icon="faUserTie" size="2x"/>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserTie, faPencilAlt, faHouseUser } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonPage, IonRouterOutlet, FontAwesomeIcon },
  setup() {
    return {
      faUserTie,
      faPencilAlt,
      faHouseUser
    }
  },
})
</script>
<style scoped>

</style>