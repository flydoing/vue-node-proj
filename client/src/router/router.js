import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from '../App.vue'
import Index from '../components/page/index.vue'
import Cate from '../components/cate/cate.vue'
import Detail from '../components/cate/detail.vue'
import Center from '../components/center/center.vue'
import Cart from '../components/cart/cart.vue'

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: App,
      children: [
        {path: 'index', name: 'index', component: Index},
        {path: 'cate', name: 'cate', component: Cate},
        // {path: 'detail', name: 'detail', component: Detail},
        {path: 'detail/:id', name: 'detail', component: Detail},
        {path: 'center', name: 'center', component: Center},
        {path: 'cart', name: 'cart', component: Cart}
      ]
    }
  ],
  linkActiveClass: 'footer-act'
})
