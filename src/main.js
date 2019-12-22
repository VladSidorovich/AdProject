import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModalComponent from './components/Shared/BuyModal'
import firebase from 'firebase/app'
import './stylus/main.styl'

Vue.config.productionTip = false

Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  router,
  store,
  vuetify,
  created () {
    var config = {
      apiKey: 'AIzaSyBrjJcwQRLCa65sxum-2eqORi6AuDU5c8Q',
      authDomain: 'ad-project-d544a.firebaseapp.com',
      databaseURL: 'https://ad-project-d544a.firebaseio.com',
      projectId: 'ad-project-d544a',
      storageBucket: 'ad-project-d544a.appspot.com',
      messagingSenderId: '982063932515',
      appId: '1:982063932515:web:f0d9a7ede3f98a88a48456',
      measurementId: 'G-QMVVX1BC4Z'
    }
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
    this.$store.dispatch('fetchAds')
  },
  render: h => h(App)
}).$mount('#app')
