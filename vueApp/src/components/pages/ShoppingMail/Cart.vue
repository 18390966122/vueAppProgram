<template>
    <div class="cart">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div v-if="empty" class="cart-empty" :style="{height: h + 'px'}">
        <p class="font">空空如也~</p>
      </div>
      <van-card
        :title="item.NAME"
        :num="item.num"
        :price="(item.PRESENT_PRICE * item.num).toFixed(2)"
        :thumb="item.IMAGE1"
        v-for='(item, index) in cartInfo' :key="index">
        <div slot="footer">
          <van-button size="mini" @click="reduce(index)">-</van-button>
          <van-button size="mini" @click="add(index)">+</van-button>
        </div>
      </van-card>
      <div class="clear">
        <van-button type="danger" @click="clear">清空购物车</van-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      cartInfo: [],
      empty: false,
      h: 0
    }
  },
  mounted () {
    this.h = (document.documentElement.clientHeight || document.body.clientHeight) - 46
  },
  created () {
    this.getCartInfo()
  },
  methods: {
    reduce (i) {
      this.cartInfo[i].num = this.cartInfo[i].num > 2 ? this.cartInfo[i].num -= 1 : 1
    },
    add (i) {
      this.cartInfo[i].num += 1
    },
    getCartInfo () {
      this.cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      this.cartInfo.length > 0 ? this.empty = false : this.empty = true
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    clear () {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
      this.empty = true
    }
  }
}
</script>

<style scoped lang="less">
.cart {
  padding-bottom: 50px;
  .cart-empty {
    background-color: #fef7f7;
    .font {
      width: 100%;
      display: inline-block;
      margin-top: 15vh;
      font-size: 20px;
      color: #ccc;
      text-align: center;
    }
  }
  .clear {
    position: fixed;
    bottom: 0;
    right: 0;
  }
}
</style>
