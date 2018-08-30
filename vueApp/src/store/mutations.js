import * as types from './mutations-type'
const mutations = {
  [types.SET_CAR_SUM] (state, carSum) {
    state.carSum = carSum
  }
}
export default mutations
