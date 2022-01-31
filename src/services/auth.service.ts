import { TokenService } from "./token.service";
import router           from "@/router";
import createStore      from "@/store";
import axios            from "axios";

const checkAuth = function() {
    axios.get(`${createStore.state.APIURL}/nasabah/sessioncheck`,{
      headers: {
        token: TokenService.getToken()!
      }
    })
    .then(response => {})
    .catch(error => {
      if(error.response.status == 401) {
        if (error.response.data.messages == 'token expired') {
          createStore.commit("setDataAlert",{
            show   :true,
            type   :'warning',
            message:'waktu login sudah habis, silahkan login ulang'}
          );
        }
        
        TokenService.removeToken();
        router.push('/login');
      } 
      else if(error.response.status == 500) {
        createStore.commit("setDataAlert",{
          show   :true,
          type   :'danger',
          message:'<b>Ups..</>, terjadi kesalahan. silahkan refresh halaman!'}
        );
      }
    })
}

const privateRoute = function(to: any, from: any, next: any) {
  const isAuthenticated = TokenService.getToken() !== null;

  if (!['Login','Register','Otp'].includes(to.name) && !isAuthenticated) {
      next({ path: '/login' });
  } 
  else if(['Login','Register','Otp'].includes(to.name) && isAuthenticated) {
      next({path: '/dashboard'} );
  } 
  else {
      next();
  }
};

export { checkAuth,privateRoute };