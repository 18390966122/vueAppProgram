import Vue from 'vue'
import Router from 'vue-router'
import shoppingMail from '@/components/pages/ShoppingMail/ShoppingMail'
import Register from '@/components/pages/Auth/Register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shoppingMail',
      component: shoppingMail
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
