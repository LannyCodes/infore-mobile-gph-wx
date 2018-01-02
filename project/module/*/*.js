import Vue from 'vue'
import App from './*.vue'
/**
 * 额外配置
 */
import 'normalize.css'
import '../../assets/css/main.css' // main css
const FastClick = require('fastclick') // 防重复点击
FastClick.attach(document.body)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
});
