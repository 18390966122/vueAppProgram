<template>
  <div class="goodsInfo" v-if="goodsInfo">
    <van-nav-bar
      title="商品详情页"
      left-text="返回"
      left-arrow
      @click-left="onGoback"
    />
    <div class="bigImg">
      <img :src="goodsInfo.IMAGE1" alt="">
    </div>
    <div class="description">
      <p>{{goodsInfo.NAME}}</p>
      <p>￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</p>
    </div>
    <div class="info">
      <van-tabs v-model="active" swipeable sticky>
        <van-tab title="商品详情" v-html="goodsInfo.DETAIL">
        </van-tab>
        <van-tab title="评论">
          商品评论
        </van-tab>
      </van-tabs>
      <div class="footer">
        <div class="add">
          <van-button type="primary" style="width: 98%">加入购物车</van-button>
        </div>
        <div class="buy">
          <van-button type="danger" style="width: 98%">直接购买</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {home} from '@/assets/service/url/home.js'
import {toMoney} from '@/assets/js/filter/moneyFilter.js'
export default {
  name: 'goodsInfo',
  data () {
    return {
      goodsInfo: null,
      active: 0,
      infoImgList: null
    }
  },
  created () {
    this.getGoodsInfo()
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
    onGoback () {
      this.$router.go(-1)
    },
    getGoodsInfo () {
      this.$httpServer(home.goodsInfo, {goodsId: this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId}).then(res => {
        this.goodsInfo = res.data.data
        console.log(this.goodsInfo)
      })
    }
  }
}
</script>

<style scoped lang="less">
.goodsInfo {
  .bigImg {
    border: 1px solid #eee;
    box-shadow: 2px 2px 2px #ccc;
    img {
      width: 100%;
      display: inline-block;
    }
  }
  .description {
    p {
      text-align: center;
      color: #0f0f0f;
      font-size: 14px;
      font-weight: 900;
      line-height: 26px;
      &:nth-child(1) {
        margin-top: 10px;
      }
      &:nth-child(2) {
        margin-bottom: 10px;
      }
    }
  }
  .info {
    .footer {
      position: fixed;
      bottom: 0px;
      width: 100%;
      background-color: #fff;
      .add {
        float: left;
        width: 50%;
      }
      .buy {
        width: 50%;
        float: right;
      }
    }
  }
}
</style>
