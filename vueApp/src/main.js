// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Row, Col, Swipe, SwipeItem, Lazyload, Dialog, List, Field, NavBar, Cell, CellGroup, Tab, Tabs, PullRefresh, Card, Tabbar, TabbarItem} from 'vant'
import httpServer from '@/assets/service/http/http.js'
import '@/assets/css/base.css'
Vue.prototype.$httpServer = httpServer
Vue.config.productionTip = false

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(Dialog).use(List).use(Field).use(NavBar).use(Cell).use(CellGroup).use(Tab).use(Tabs).use(PullRefresh).use(Card).use(Tabbar).use(TabbarItem)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
