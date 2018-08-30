// 入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 用于检测组件状态(打印日志信息)
import createLogger from 'vuex/dist/logger'

// 控制plugins只在开发模式下生效
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  state,
  mutations,
  plugins: debug ? [createLogger()] : []
})
