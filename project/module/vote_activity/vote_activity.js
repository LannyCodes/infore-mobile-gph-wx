import Vue from 'vue'
import App from './vote_activity.vue'
import router from '../../router/vote_activity'
/**
 * 额外配置
 */
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import store from '../../store'
import 'normalize.css'
import '../../assets/css/main.css' // main css
import 'vux/src/styles/1px.less' // 边框
import ToastPlugin from 'vux/src/plugins/toast' // Toast
import WechatPlugin from 'vux/src/plugins/wechat' //wechat
import 'vux/src/styles/close.less' // 叉号
const FastClick = require('fastclick') // 防重复点击
FastClick.attach(document.body)
import { RadioGroup,  Radio} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(RadioGroup);
Vue.use(Radio)
Vue.use(Vuex);
Vue.use(ToastPlugin);
Vue.use(WechatPlugin);

const loadingConfig = require('@/config/loading.config.js')
sync(store, router)
loadingConfig(store, router)

new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
