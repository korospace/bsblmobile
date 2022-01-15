import axios            from 'axios';
import { createStore }  from 'vuex'
import { TokenService } from "@/services/token.service";
import router           from "@/router";

export default createStore({
  state() {
    return {
      APIURL   : "https://t-gadgetcors.herokuapp.com/https://bsbl.herokuapp.com",
      linkAdmin: "https://wa.me/6281287200602?text=Hallo%20Admin,%20saya%20ada%20kendala%20mengenai%20password",
      dataAlert: {
        show   : false,
        type   : '',
        message: '',
      },
      dataLogin: {
        username_or_email: '',
        password: ''
      },
      dataSaldo : "",
      dataNasabah : "",
      dataSampahMasuk: "",
      showForgotPass : false,
      currentDashboardTab : "saldo saya",
    }
  },
  mutations: {
    setDataAlert: function(state: any, value) {
      state.dataAlert.show    = value.show;
      state.dataAlert.type    = value.type;
      state.dataAlert.message = value.message;
    },
    setDataLogin: function(state: any, value) {
      state.dataLogin.username_or_email = value.username_or_email;
      state.dataLogin.password = value.password;
    },
    setShowForgotPass: function(state: any, value) {
      state.showForgotPass = value;
    },
    setDashboardTab: function(state: any, value) {
      state.currentDashboardTab = value;
    },
    setDataSaldo:  function(state: any, value) {
      state.dataSaldo = value;
    }, 
    setDataNasabah:  function(state: any, value) {
      state.dataNasabah = value;
    }, 
    setDataSampahMasuk:  function(state: any, value) {
      state.dataSampahMasuk = value;
    }, 
  },
  actions: {
    getProfileNasabah: function ({ commit },refresher = "") {
      axios.get(`${this.state.APIURL}/nasabah/getprofile`,{
        headers: {
            token: TokenService.getToken()!
          }
      })
      .then(response => {
        commit("setDataNasabah",response.data.data);
        
        if (refresher) {
          refresher.complete();
        }
      })
      .catch(error => {
        // Unauthorize
        if (error.response.status == 401) {
          if (error.response.data.messages == 'token expired') {
            commit("setDataAlert",{
              show   :true,
              type   :'warning',
              message:'waktu login sudah habis, silahkan login ulang'}
            );
          }

          router.push("/login");
        }
      })
    },
    getSaldo: function ({ commit }) {
      axios.get(`${this.state.APIURL}/transaksi/getsaldo`,{
        headers: {
            token: TokenService.getToken()!
          }
      })
      .then(response => {
        commit("setDataSaldo",response.data.data);
      })
      .catch(error => {
        
      })
    },
    getSampahMasuk: function ({ commit }) {
      axios.get(`${this.state.APIURL}/transaksi/sampahmasuk`,{
        headers: {
            token: TokenService.getToken()!
          }
      })
      .then(response => {
        commit("setDataSampahMasuk",response.data.data);
      })
      .catch(error => {
        
      })
    },
  },
  modules: {
  }
})
