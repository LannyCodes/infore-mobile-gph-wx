import Vue from 'vue'
import Router from 'vue-router'

import NotFoundComponent from '@/pages/404/index.vue'
import Main from '../module/envir_knowledge/component/pages/index.vue'
import Detail from '../module/envir_knowledge/component/pages/detail.vue'

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
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
