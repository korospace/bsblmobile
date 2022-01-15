import { createRouter, createWebHistory } from '@ionic/vue-router';
import { privateRoute,checkAuth}          from '@/services/auth.service';
import { RouteRecordRaw } from 'vue-router'
import Tabs               from '../views/Tabs.vue'
import Login              from '../views/Login.vue'
import Register           from '../views/Register.vue'
import Otp                from '../views/Otp.vue'
import Article            from '../views/Main/Article.vue'
import Dashboard          from '../views/Main/Dashboard.vue'
import Profile            from '../views/Main/Profile.vue'

const routes: Array<RouteRecordRaw> = [
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
    path: '/otp',
    name: 'Otp',
    component: Otp,
    beforeEnter: privateRoute
  },
  {
    path: '/',
    component  : Tabs,
    redirect   : "/dashboard",
    beforeEnter: checkAuth,
    children   : [
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
