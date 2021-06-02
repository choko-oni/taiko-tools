import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '@/components/indexPage.vue'
import dragTest from '@/components/dragTest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexPage',
      component: indexPage
    },
    {
      path: '/dragTest',
      name: 'dragTest',
      component: dragTest
    },
  ]
})
