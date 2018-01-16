import Vue from 'vue'
import App from './map.vue'
import router from '../../router/map'
/**
 * 额外配置
 */
import Vuex from 'vuex'
import store from '../../store'
import 'normalize.css'
import '../../assets/css/main.css' // main css
Vue.use(Vuex)

new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
