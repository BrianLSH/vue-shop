import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://www.tangxiaoyang.vip:8888/api/v2/'
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
