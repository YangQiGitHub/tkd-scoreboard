import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Divider, Card, Input, Tag, Message, Select, Option, Icon, Drawer, Button, Cascader, Collapse, Panel, InputNumber, Switch, RadioGroup, Radio } from 'iview'
import 'iview/dist/styles/iview.css'

((components) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
})({ Divider, Card, Input, Tag, Select, Option, Icon, Drawer, Button, Cascader, Collapse, Panel, InputNumber, 'i-switch': Switch, RadioGroup, Radio })

Vue.prototype.$Message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
