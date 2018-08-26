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
      path: '/',
      name: 'ShoppingMail',
      component: (resolve) => {
        require(['@/components/pages/ShoppingMail/ShoppingMail'], resolve)
      },
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: '/GoodsInfo',
      name: 'goodsInfo',
      component: (resolve) => {
        require(['@/components/pages/ShoppingMail/goodsInfo'], resolve)
      },
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: '/Category',
      name: 'Category',
      component: (resolve) => {
        require(['@/components/pages/ShoppingMail/Category'], resolve)
      },
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: (resolve) => {
        require(['@/components/pages/Auth/Register'], resolve)
      }
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
