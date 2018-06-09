import Vue from 'vue'
import Router from 'vue-router'
import shoppingMail from '@/components/pages/ShoppingMail/ShoppingMail'
import httpServer from '@/assets/service/http/http.js'

Vue.use(Router).use(httpServer)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shoppingMail',
      component: shoppingMail
    }
  ]
})
