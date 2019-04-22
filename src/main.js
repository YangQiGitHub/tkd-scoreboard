import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Rate, Divider } from 'iview'
import 'iview/dist/styles/iview.css'

((components) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
})({ Rate, Divider })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
