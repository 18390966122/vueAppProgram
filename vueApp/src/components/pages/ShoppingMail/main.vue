<template>
  <div class="main">
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="home">首页</van-tabbar-item>
      <van-tabbar-item icon="chat">商品列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting">会员中心</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      active: 0,
      cartSum: 0,
      nowPath: ''
    }
  },
  created () {
    this.getCarNum()
  },
  computed: {
  },
  updated () {
    this.changeTabBarActive()
  },
  methods: {
    getCarNum () {
      this.carSum = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo).length : 0
    },
    changeTabbar (active) {
      switch (active) {
        case 0:
          this.$router.push({name: 'ShoppingMail'})
          break
        case 1:
          this.$router.push({name: 'Category'})
          break
        case 2:
          this.$router.push({name: 'Cart'})
          break
        case 3:
          this.$router.push({name: 'PersonCenter'})
          break
      }
    },
    changeTabBarActive () {
      this.getCarNum()
      this.nowPath = this.$route.path
      if (this.nowPath === '/Cart') {
        this.active = 2
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
