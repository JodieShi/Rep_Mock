import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import Antd from 'ant-design-vue'
import store from './store'

const router = initRouter(store.state.setting.asyncRoutes)
Vue.use(Antd)

new Vue({
  render: h => h(App),
}).$mount("#app")
