import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import core from 'core-js'

sync(store, router)

Vue.config.productionTip = false
export const userLocationBus = new Vue()

new Vue({
  core,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
