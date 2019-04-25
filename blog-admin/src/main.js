import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/styles/index.scss' // global css

import '@/icons' // icon
Vue.config.productionTip = false

import 'babel-polyfill'
import '@/components/globalComponent.js'
import http from './utils/request'
Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
