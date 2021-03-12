import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'

Vue.use(Antd)

new Vue({
  render: h => h(App),
}).$mount("#app")
