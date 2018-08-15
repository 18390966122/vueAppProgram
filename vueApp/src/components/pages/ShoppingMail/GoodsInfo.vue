<template>
  <div id = "goodsInfo">
    <van-nav-bar
      title="商品详情页"
      left-text="返回"
      left-arrow
      @click-left="onGoback"
    />
    <img :src="goodsInfo.IMAGE1" alt="">
  </div>
</template>

<script>
import {home} from '@/assets/service/url/home.js'
export default {
  name: 'goodsInfo',
  data () {
    return {
      goodsInfo: null
    }
  },
  created () {
    this.getGoodsInfo()
  },
  methods: {
    onGoback () {
      this.$router.go(-1)
    },
    getGoodsInfo () {
      this.$httpServer(home.goodsInfo, {goodsId: this.$route.query.goodsId}).then(res => {
        this.goodsInfo = res.data.data
        console.log(this.goodsInfo)
      })
    }
  }
}
</script>

<style scoped>
</style>
