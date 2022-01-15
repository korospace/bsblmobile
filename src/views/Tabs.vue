<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <!-- // Refresher // -->
        <ion-refresher
          slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" 
          @ionRefresh="doRefresh">
            <ion-refresher-content>
            </ion-refresher-content>
        </ion-refresher>

        <ion-router-outlet></ion-router-outlet>

        <!-- // Tabs // -->
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/dashboard">
            <font-awesome-icon :icon="faHome" size="2x"/>
          </ion-tab-button>
            
          <ion-tab-button tab="tab2" href="/artikel">
            <font-awesome-icon :icon="faNewspaper" size="2x"/>
          </ion-tab-button>
          
          <ion-tab-button tab="tab3" href="/profile">
            <font-awesome-icon :icon="faUser" size="2x"/>
          </ion-tab-button>
        </ion-tab-bar>
        
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore }        from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faNewspaper, faUser, } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  name: 'Tabs',
  components: { 
    IonLabel, 
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonPage, 
    IonRouterOutlet, 
    FontAwesomeIcon,
    IonContent },
  setup() {
    const store = useStore();

    const doRefresh = (event) => {
      store.commit("setDataNasabah","");
      store.dispatch("getProfileNasabah",event.target);
      
      store.commit("setDataSaldo","");
      store.dispatch("getSaldo");

      store.commit("setDataSampahMasuk","");
      store.dispatch("getSampahMasuk");
    };

    return {
      faHome,
      faNewspaper,
      faUser,
      doRefresh
    }
  },
})
</script>

<style scoped>

</style>