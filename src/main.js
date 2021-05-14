import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://www.tangxiaoyang.vip:8888/api/v2/'
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  // console.log(userInfo)
  config.headers.Authorization = userInfo ? userInfo.token : ''
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
