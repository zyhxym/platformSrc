import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'
import videosession from '@/components/videosession'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'home',
      component: home
    },

    {
      path: '/videosession',
      name: 'videosession',
      component: videosession,
    },

  ]
})
