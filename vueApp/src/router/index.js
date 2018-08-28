import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: (resolve) => {
        require(['@/components/pages/Auth/Login'], resolve)
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: (resolve) => {
        require(['@/components/pages/Auth/Register'], resolve)
      }
    },
    {
      path: '/',
      name: 'Main',
      component: (resolve) => {
        require(['@/components/pages/ShoppingMail/Main'], resolve)
      },
      children: [{
        path: '/ShoppingMail',
        name: 'ShoppingMail',
        component: (resolve) => {
          require(['@/components/pages/ShoppingMail/ShoppingMail'], resolve)
        }
      },
      {
        path: '/GoodsInfo',
        name: 'goodsInfo',
        component: (resolve) => {
          require(['@/components/pages/ShoppingMail/goodsInfo'], resolve)
        }
      },
      {
        path: '/Category',
        name: 'Category',
        component: (resolve) => {
          require(['@/components/pages/ShoppingMail/Category'], resolve)
        }
      },
      {
        path: '/Cart',
        name: 'Cart',
        component: (resolve) => {
          require(['@/components/pages/ShoppingMail/Cart'], resolve)
        }
      },
      {
        path: '/PersonCenter',
        name: 'PersonCenter',
        component: (resolve) => {
          require(['@/components/pages/ShoppingMail/PersonCenter'], resolve)
        }
      }]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('userInfo')) {
    next()
  } else {
    next({
      path: '/Login',
      query: {redirect: to.fullPath}
    })
  }
})
export default router
