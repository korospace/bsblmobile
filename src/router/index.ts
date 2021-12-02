import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router'
import { TokenService } from '../services/token.service'
import Home from '../views/Home.vue'
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login/Login.vue'
import Article from '../views/Main/Article.vue'
import Dashboard from '../views/Main/Dashboard.vue'
import Profile from '../views/Main/Profile.vue'

const privateRoute = function(to: any, from: any, next: any) {
  const isAuthenticated = TokenService.getToken() !== null;

  if (to.name !== 'Login' && !isAuthenticated) {
    next({ path: '/login' });
  } else if(to.name == 'Login' && isAuthenticated) {
    next({path: '/tabs/dashboard'} );
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    beforeEnter: privateRoute
  },{
    path: '/tabs',
    redirect: '/tabs/dashboard',
    beforeEnter: privateRoute
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: privateRoute
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: privateRoute
  },
  {
    path: '/tabs/',
    component: Tabs,
    beforeEnter: privateRoute,
    children: [
      {
        path: '',
        redirect: '/tabs/dashboard'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'artikel',
        component: Article
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
