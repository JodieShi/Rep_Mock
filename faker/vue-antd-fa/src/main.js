import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import Antd from 'ant-design-vue'
import store from './store'
import { initI18n } from '@/utils/i18n'
import bootstrap from '@/bootstrap'

const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')

Vue.use(Antd)
Vue.config.productionTip = false

bootstrap({ router, store, i18n, message: Vue.prototype.$message })

new Vue({
  router,
  store,
  i18,
  render: h => h(App),
}).$mount("#app")
