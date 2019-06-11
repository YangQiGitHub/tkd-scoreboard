import Vue from 'vue'
import Router from 'vue-router'

import Scoreboard from './pages/scoreboard'
import Newboard from './pages/newboard'
import About from './pages/about'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Scoreboard',
    //   component: Scoreboard
    // },
    {
      path: '/',
      name: 'Scoreboard',
      component: Newboard
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
