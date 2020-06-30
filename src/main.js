/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/element.js'
import './element-variables.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
