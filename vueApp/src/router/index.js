import Vue from 'vue'
import Router from 'vue-router'
import shoppingMail from '@/components/pages/ShoppingMail/ShoppingMail'
import Register from '@/components/pages/Auth/Register'
import Login from '@/components/pages/Auth/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
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
