import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      APIURL   : "https://t-gadgetcors.herokuapp.com/https://bsbl.herokuapp.com",
      dataAlert: {
        show   : false,
        type   : '',
        message: '',
      },
      dataLogin: {
        username_or_email: '',
        password: ''
      }
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
  },
  actions: {
  },
  modules: {
  }
})
