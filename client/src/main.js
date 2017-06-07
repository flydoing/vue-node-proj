import Vue from 'vue'
import router from './router/router.js'
import store from './store/store.js'
import axios from 'axios'
Vue.prototype.$http = axios
// import App from './App.vue'

const app = new Vue({
  router,
  store
}).$mount('#app')
// const app = new Vue({
//   router,
//   store,
//   render: h => h('.app', App)
// })

export default app
