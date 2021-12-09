import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login/Login.vue'
import Article from '../views/Main/Article.vue'
import Dashboard from '../views/Main/Dashboard.vue'
import Profile from '../views/Main/Profile.vue'
import { checkAuth, privateRoute } from '@/services/auth.service';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    beforeEnter: checkAuth
  },{
    path: '/tabs',
    redirect: '/tabs/dashboard',
    beforeEnter: checkAuth
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: checkAuth
    
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
    beforeEnter: checkAuth,
    children: [
      {
        path: '',
        redirect: '/tabs/dashboard'
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'profile',
        component: Profile,
      },
      {
        path: 'artikel',
        component: Article,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
