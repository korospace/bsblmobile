import { createRouter, createWebHistory } from '@ionic/vue-router';
import { privateRoute,checkAuth}          from '@/services/auth.service';
import { RouteRecordRaw } from 'vue-router'
import Tabs               from '../views/Tabs.vue'
import Login              from '../views/Login.vue'
import Register           from '../views/Register.vue'
import Otp                from '../views/Otp.vue'
import Info               from '../views/Main/Info.vue'
import Dashboard          from '../views/Main/Dashboard.vue'
// import Saldo              from '@/components/dashboard.Saldo.vue'
// import Transaksi          from '@/components/dashboard.Transaksi.vue'
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
    children   : [
      {
        path: 'dashboard',
        component: Dashboard,
        beforeEnter: checkAuth,
        // children   : [
        //   {
        //     path: 'saldo',
        //     component: Saldo,
        //   },
        //   {
        //     path: 'transaksi',
        //     component: Transaksi,
        //   }
        // ]
      },
      {
        path: 'profile',
        component: Profile,
        beforeEnter: checkAuth,
      },
      {
        path: 'info',
        component: Info,
        beforeEnter: checkAuth,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
