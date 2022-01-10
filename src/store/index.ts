import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      APIURL   : "https://t-gadgetcors.herokuapp.com/https://bsbl.herokuapp.com",
      dataAlert: {
        show   : false,
        type   : '',
        message: ''
      }
    }
  },
  mutations: {
    setDataAlert: function(state, value) {
      state.dataAlert.show    = value.show;
      state.dataAlert.type    = value.type;
      state.dataAlert.message = value.message;
    }
  },
  actions: {
  },
  modules: {
  }
})
