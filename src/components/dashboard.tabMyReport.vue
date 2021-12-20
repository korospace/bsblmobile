<template>
  <div id="myReport" class="tabcontent">
    <div class="centers">
        <div class="infocard">
        <img :src="'./assets/images/Person-Logo.png'" style="width:28px;" alt="">
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
        <img :src="'assets/images/banksampah-logo.png'" alt="" class="logo">
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loadingController } from '@ionic/vue';
import axios from 'axios';
import { getApiURL, TokenService } from '@/services/token.service';

export default defineComponent({
  name: 'tabMyReport',
  components: {
  },
//   setup() {
    
//   },
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
    }
  },
  mounted() {
    this.getProfile();
  }
});
</script>
<style scoped>
  /* Style the tab content */
  .tabcontent {
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
    background: url('../../public/assets/images/Card Member.jpg') no-repeat center center fixed !important;
    background-size: cover !important;
    border-radius: 10px;
  }
  .detailcard {
    /* Doesn't Work.. Idk why
    border-spacing: 14px; */
    margin-top: 18px;
    font-size: 14px;
  }
  .logo {
    width: 44px;
    float: right;
  }
</style>