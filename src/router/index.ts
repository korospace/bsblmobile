import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Article from '../views/Main/Article.vue'
import Dashboard from '../views/Main/Dashboard.vue'
import Profile from '../views/Main/Profile.vue'
import tabMyReport from '../components/dashboard.tabMyReport.vue'
import tabMyMoney from '../components/dashboard.tabMyMoney.vue'
import { checkAuth, privateRoute } from '@/services/auth.service';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs',
    beforeEnter: checkAuth
  },
  {
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
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: privateRoute
  },
  {
    path: '/tabmyreport',
    component: tabMyReport
  },
  {
    path: '/tabmymoney',
    component: tabMyMoney
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
