<template>
  <ion-page>    
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="main-wrapper">
        <div class="top-page centers">
          Bank Sampah Budi Luhur
        </div>
        <div class="tab">
          <div class="centers">
            <button class="tablinks" v-on:click="mainSwitch(event, 'myReport')">Laporan Saya</button>
            <button class="tablinks" v-on:click="mainSwitch(event, 'myMoney')">Uang Saya</button>
          </div>
        </div>
        
        <div id="myReport" class="tabcontent">
          <div class="centers">
            <div class="infocard">
              <img src="assets/images/Person-Logo.png" style="width:28px;" alt="">
              <br>
              {{userid}}
              <table class="detailcard">
                <tr>
                  <th style="padding-right: 24px;">Username</th>
                  <th>Tanggal Bergabung</th>
                </tr>
                <tr>
                  <td>{{name}}</td>
                  <td>{{createdDay}} {{createdMonth}} {{createdYear}}</td>
                </tr>
              </table>
              <img src="assets/images/banksampah-logo.png" alt="" class="logo">
            </div>
          </div>
        </div>

        <div id="myMoney" class="tabcontent">
          <h3>Duid Ngab</h3>
          <p>E for Error</p> 
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {IonPage, IonRefresher, IonRefresherContent, loadingController} from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import axios from 'axios';
import { getApiURL, TokenService } from '@/services/token.service';

export default defineComponent({
  name: 'Dashboard',
  components: {
      IonPage,
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
      name        : "Nama",
      email       : "Email",
      userid      : "UserID",
      createdDay  : "04",
      createdMonth: "May",
      createdYear : "2001"
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
    getProfile : async function() {
      const loading = await this.createSpinner('Silahkan Tunggu...');
      loading.present();
      axios.get(`${getApiURL}/nasabah/getprofile`,{
        headers: {
            token: TokenService.getToken()!
          }
      })
      .then(response => {
        const date          = new Date(parseInt(response.data.data.created_at) * 1000);
        const day           = date.toLocaleString("en-US",{day: "numeric"});
        const month         = date.toLocaleString("en-US",{month: "long"});
        const year          = date.toLocaleString("en-US",{year: "numeric"});
        this.name           = response.data.data.nama_lengkap;
        this.email          = response.data.data.email;
        this.userid         = response.data.data.id;
        this.createdDay     = day;
        this.createdMonth   = month;
        this.createdYear    = year;
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      })
    },
    mainSwitch : function(evt: any, tabName: any) {
      let i;
      const tabcontent = Array.from(document.getElementsByClassName('tabcontent') as HTMLCollectionOf<HTMLElement>)
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      const tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      const tabNames = document.getElementById(tabName)!;
      tabNames.style.display = "block";
      evt.currentTarget.className += " active";
    }
  },
  mounted() {
    this.getProfile();
  }
});
</script>
<style>
  .main-wrapper {
    color: white !important;
  }
  /* Style the tab */
  .tab {
    overflow: hidden;
    background-color: #3D5D1E;
    border-radius: 10px;
    margin: 0 20px;
  }

  /* Style the buttons inside the tab */
  .tab button {
    min-width: 50%;
    border-radius: 10px;
    background-color: #3D5D1E;
    float: left;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 12px;
  }

  /* Change background color of buttons on hover */
  .tab button:hover, 
  .tab button.active {
    background-color: #54762A;
  }

  /* Style the tab content */
  .tabcontent {
    display: none;
    padding: 6px 12px;
  }

  /* Center Div */
  .centers {
    display: flex;
    justify-content: center;
  }

  /* Info Card */
  .infocard {
    width: 95%;
    height: 180px;
    padding: 18px 28px;
    background: url('../../../public/assets/images/Card Member.jpg') no-repeat center center fixed !important;
    background-size: cover !important;
    border-radius: 10px;
  }
  table {
    /* Doesn't Work.. Idk why
    border-collapse: collapse;
    border-spacing: 0; */
  }
  .detailcard {
    /* Doesn't Work.. Idk why
    border-spacing: 14px; */
    margin-top: 18px;
    font-size: 14px;
  }
  .logo, 
  .top-logo {
    width: 44px;
  }
  .top-page {
    margin: 20px 0 ;
  }
</style>