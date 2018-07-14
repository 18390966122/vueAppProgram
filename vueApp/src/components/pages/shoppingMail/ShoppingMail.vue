<template>
    <div class="home" v-if='indexData'>
        <div class="search-bar">
            <van-row>
                <van-col span="3"><img src="../../../assets/images/home/location.png" alt="定位logo" class="location-img"></van-col>
                <van-col span="16">
                    <input type="text" class="search-input" placeholder="请输入搜索内容">
                </van-col>
                <van-col span="5"><van-button size="mini" class="search-btn">搜索</van-button></van-col>
            </van-row>
        </div>
        <!-- swipe area -->
        <div class="swipe-area">
            <van-swipe :autoplay="3000" class="swipe-box">
                <van-swipe-item><img src="../../../assets/images/home/swipe-1.jpg" alt=""></van-swipe-item>
                <van-swipe-item><img src="../../../assets/images/home/swipe-2.jpg" alt=""></van-swipe-item>
                <van-swipe-item><img src="../../../assets/images/home/swipe-3.jpg" alt=""></van-swipe-item>
            </van-swipe>
        </div>
        <!-- type - bar -->
        <div class="type-bar">
          <ul>
            <li class="typeBar-lis" v-for="(item, index) in  indexData.category" :key="index">
              <img :src="item.image" alt="">
            </li>
          </ul>
        </div>
        <div class="advertesPicture">
          <img :src="indexData.advertesPicture.PICTURE_ADDRESS" alt="">
        </div>
        <!-- 商品推荐 -->
        <div class="recommand-area">
          <div class="recommand-title">
            商品推荐
          </div>
          <div class="recommand-body">
            <swiper :options="swiperOptions">
              <swiper-slide v-for="(item, index) in indexData.recommend" :key='index'>
                <div class="recommand-list" :id="item.goodsId">
                  <img :src="item.image" alt="" width="80%">
                  <div class="recommand-goodsName">{{item.goodsName}}{{item.goodsName}}</div>
                  <div class="recommand-price">￥{{item.price}}(￥{{item.mallPrice}})</div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
    </div>
</template>

<script>
import {HOME} from '@/assets/service/url/home.js'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import httpServer from '@/assets/service/http/http.js'
// import axios from 'axios'
// vant是24列栅格布局
export default {
  data () {
    return {
      indexData: null,
      swiperOptions: {
        slidesPerView: 3,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        recommandList: []
      }
    }
  },
  computed: {
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.getCommodityList()
  },
  methods: {
    getCommodityList () {
      this.$httpServer(HOME.INDEX).then((res) => {
        console.log(res.data.data)
        this.indexData = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    .search-bar {
      height: 2.2rem;
      line-height: 2.2rem;
      background-color: #e5017d;
      overflow: hidden;
      .location-img {
        display: inline-block;
        height: 1.2rem;
        margin: 0.5rem;
      }
      .search-input {
        background-color: #e5017d;
        width: 100%;
        border: none;
        border-bottom: 1px solid #fff;
        height: 1.5rem;
      }
      .search-btn {
      margin: 0.5rem;
      }
    }
    .swipe-area {
      padding: 0;
      position: relative;
      max-height: 20rem;
      .swipe-box {
        width: 100%;
        height: 10rem;
        display: inline-block;
        img {
          display: inline-block;
          width: 100%;
        }
      }
    }
    .type-bar {
      margin: .3rem;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      border-radius: .3rem;
      font-size: 14px;
      .typeBar-lis {
        width: 16.8%;
        float: left;
        margin: 0 .3rem;
        img {
          display: inline-block;
          width: 100%;
        }
      }
    }
    .advertesPicture {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .recommand-area {
      .recommand-title {
        color:#e5017d;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        padding: .2rem .2rem .2rem .6rem;
      }
      .recommand-body {
        border-bottom: 1px solid #eee;
        .recommand-list {
          height: 10rem;
          width: 99%;
          .recommand-goodsName {
            height: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color:#000;
          }
          .recommand-price {
            font-size: 12px;
            font-weight: 700;
          }
        }
      }
    }
  }
</style>
