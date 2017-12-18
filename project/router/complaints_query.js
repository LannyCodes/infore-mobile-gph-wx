import Vue from 'vue'
import Router from 'vue-router'

import NotFoundComponent from '@/pages/404/index.vue'
import Main from '../module/complaints_query/component/pages/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: NotFoundComponent
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
