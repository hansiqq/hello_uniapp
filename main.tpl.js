import Vue from 'vue'
import store from '@/service/store/index'
import App from './App'
import weixin from '@/service/plugin/weixin'
import '@/assets/style/iconfont/css/iconfount.css'
// #ifdef H5
import '@/assets/style/h5/index.scss'
// #endif

/* #ifndef H5 */
import '@/assets/style/mp/index.scss'
// #endif

/* 5ug auto-import */
Vue.config.productionTip = false

// #ifdef H5
Vue.prototype.$client = 'WapH5'
// #endif

// #ifndef H5
Vue.prototype.$client = 'WeChatLite'
// #endif

Vue.directive('lazy', {
  inserted: el => {
    el.onerror = () => {
      el.src = 'http://retail_v13.api.5ug.com/wwwroot/static/images/nopic.jpg'
    }
  }
})

Vue.prototype.$store = store
Vue.prototype.$bus = new Vue()
App.mpType = 'app'
weixin.login().then()
const app = new Vue({
  store,
  ...App
})
app.$mount()
