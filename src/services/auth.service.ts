import router from "@/router";
import axios from "axios";
import { getApiURL, TokenService } from "./token.service";
import { alertController  } from '@ionic/vue';

const checkAuth = function() {
    const TOKEN = TokenService.getToken();

    axios.get(`${getApiURL}/nasabah/sessioncheck`,{
      headers: {
        token: TOKEN!
      }
    })
    .then(async (response) => {
      console.log(response);
      const alert = await alertController
      .create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK'],
      });

      await alert.present();
    })
    .catch(error => {
      if(error.response.status == 401) {
        TokenService.removeToken();
        router.push('/login');
      } 
      else if(error.response.status == 500) {
        TokenService.removeToken();
      }
    })
}

const privateRoute = function(to: any, from: any, next: any) {
    const isAuthenticated = TokenService.getToken() !== null;

    if (!['Login','Register'].includes(to.name) && !isAuthenticated) {
        next({ path: '/login' });
    } 
    else if(['Login','Register'].includes(to.name) && isAuthenticated) {
        next({path: '/tabs/dashboard'} );
    } 
    else {
        next();
    }
};

export {privateRoute, checkAuth}