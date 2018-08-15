<template>
  <div class="hot-goods">
        <div @click="goToGoodsInfo">
            <img :src="image" alt="" v-lazy="image">
            <div class="goods-text">{{name}}</div>
            <div class="goods-text">￥{{price | moneyFilter}}(￥{{mallPrice | moneyFilter}})</div>
        </div>
  </div>
</template>

<script>
import { toMoney } from '@/assets/js/filter/moneyFilter.js'
import {lazyComponent} from 'vue-lazyload'
export default {
  name: 'hootGoods',
  props: ['name', 'image', 'price', 'mallPrice', 'id'],
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  components: {
    lazyComponent
  },
  methods: {
    goToGoodsInfo () {
      this.$router.push({name: 'goodsInfo', query: {goodsId: this.id}})
    }
  }
}
</script>

<style scoped lang="less">
.hot-goods {
  text-align: center;
  height: 212px;
  img {
    width: 86%;
  }
  .goods-text {
    padding: 0 .3rem;
    font-size: 12px;
    color: #000;
  }
}
</style>
