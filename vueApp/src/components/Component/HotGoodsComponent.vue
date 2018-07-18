<template>
  <div class="hot-goods">
        <div>
            <img :src="singerHotGoodsData.image" alt="" v-lazy="singerHotGoodsData.image">
            <div class="goods-text">{{singerHotGoodsData.name}}</div>
            <div class="goods-text">￥{{singerHotGoodsData.price | moneyFilter}}(￥{{singerHotGoodsData.mallPrice | moneyFilter}})</div>
        </div>
  </div>
</template>

<script>
import { toMoney } from '@/assets/js/filter/moneyFilter.js'
import {lazyComponent} from 'vue-lazyload'
export default {
  name: 'hootGoods',
  props: ['singerHotGoodsData'],
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  components: {
    lazyComponent
  }
}
</script>

<style scoped lang="less">
.hot-goods {
  text-align: center;
  height: 212px;
  img {
    width: 100%;
  }
  .goods-text {
    padding: 0 .3rem;
    font-size: 12px;
    color: #000;
  }
}
</style>
