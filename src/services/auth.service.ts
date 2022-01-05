import router from "@/router";
import axios from "axios";
import { getApiURL, TokenService } from "./token.service";

const checkAuth = function() {
    const TOKEN           = TokenService.getToken();
    axios.get(`${getApiURL}/nasabah/sessioncheck`,{
      headers: {
        token: TOKEN!
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      if(error.response.status == 401) {
        console.log('lho kok iso');
        TokenService.removeToken();
        router.push('/login');
      } 
      else if(error.response.status == 500) {
        TokenService.removeToken();
        router.push('/login');
      }
    })
}

const privateRoute = function(to: any, from: any, next: any) {
    const isAuthenticated = TokenService.getToken() !== null;
    
    // if (!['Login','Register'].includes(to.name) && !isAuthenticated) {
    //     next({ path: '/login' });
    // } 
    // else if(to.name == 'Login' && isAuthenticated) {
    //     next({path: '/tabs/dashboard'} );
    // } 
    // else if(to.name == 'Register' && isAuthenticated) {
    //     next({path: '/tabs/dashboard'} );
    // }
    // else {
    // }
    next();
};

export {privateRoute, checkAuth}