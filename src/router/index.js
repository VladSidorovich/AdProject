import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Ad from '../components/Ads/Ad'
import AdList from '../components/Ads/AdList'
import NewAd from '../components/Ads/NewAd'
import Login from '../components/Auth/Login'
import Registration from '../components/Auth/Registration.vue'
import Orders from '../components/User/Orders.vue'
import AuthGuard from '../router/auth-guard'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'new',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    },
    {
      path: '/ad/:id',
      name: 'ad',
      props: true,
      component: Ad,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }]
})
