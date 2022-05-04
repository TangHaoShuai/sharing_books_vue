import Vue from 'vue'
import App from './App'
import store from './store'

let ip = '192.168.31.68'
Vue.prototype.$url = 'http://'+ip+':8088/'
Vue.prototype.$tx_url = 'http://'+ip+':8088/static/user_tx/'
Vue.prototype.$bill_img_url = 'http://'+ip+':8088/static/bill_img/'
Vue.prototype.$article_img_url = 'http://'+ip+':8088/static/article_img/'
//全局引用request
import request from 'common/request.js'
Vue.prototype.$request = request


import t_data from '@/common/t_data.js'
Vue.prototype.$t_data = t_data

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

Vue.prototype.$store = store

const app = new Vue({
	store,
	...App
})
app.$mount()
