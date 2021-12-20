<template>
  <ion-page>    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="top-page centers">
        Bank Sampah Budi Luhur
      </div>
      <div class="tab">
        <div class="centers">
          <button class="button" @click="mainSwitch('myReport')" v-on:click="mainSwitch('myReport')">Laporan Saya</button>
          <button class="button" @click="mainSwitch('myMoney')" v-on:click="mainSwitch('myMoney')">Uang Saya</button>
        </div>
      </div>
      
      <dashboard-tab-my-report v-if="myReportisShow"/>
      <dashboard-tab-my-money v-if="myMoneyisShow"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {IonPage, IonRefresher, IonRefresherContent, loadingController} from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import DashboardTabMyReport from '../../components/dashboard.tabMyReport.vue';
import DashboardTabMyMoney from '../../components/dashboard.tabMyMoney.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    IonPage,
    IonRefresher, 
    IonRefresherContent,
    DashboardTabMyReport,
    DashboardTabMyMoney
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
      tabLinkActive : "myReport",
      myReportisShow: true,
      myMoneyisShow : false
    }
  },
  methods : {
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
    tabCheck : function (params: string) {
      return params == this.tabLinkActive;
    },
    mainSwitch : function(tabName: any) {
      this.tabLinkActive = tabName;
      if (tabName == 'myReport') {
        this.myReportisShow = true;
        this.myMoneyisShow  = false;
      } else {
        this.myReportisShow = false;
        this.myMoneyisShow  = true;
      }
      
    }
  }
});
</script>

<style> /* Style the tab */
  .tab {
    overflow: hidden;
    background-color: #3D5D1E;
    border-radius: 10px;
    margin: 0 20px;
  }

  /* Style the buttons inside the tab */
  .tab .button {
    min-width: 50%;
    border-radius: 10px;
    background-color: #3D5D1E;
    float: left;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 12px;
    text-decoration: none;
    text-align: center;
  }

  /* Change background color of .buttons on hover */
  .tab .button:hover, 
  .tab .button.active {
    background-color: #54762A;
  }

  /* Center Div */
  .centers {
    display: flex;
    justify-content: center;
  }
  .top-page {
    margin: 20px 0 ;
  }
</style>