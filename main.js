import Vue from 'vue'
import store from '@/service/store/index'
import App from './App'

Vue.config.productionTip = false

Vue.directive('lazy', {
  inserted: el => {
    el.onerror = () => {
      el.src = 'http://retail_v13.api.5ug.com/wwwroot/static/images/nopic.jpg'
    }
  }
})

App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()

