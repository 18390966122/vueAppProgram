<template>
<div>
  <div class="home" v-if='indexData'>
        <div class="search-bar">
            <van-row>
                <van-col span="3"><img src="../../../assets/images/home/location.png" alt="定位logo" class="location-img" @click="show = true"></van-col>
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
              <swiper-slide v-for="(rem, index) in indexData.recommend" :key='index'>
                <div class="recommand-list" :id="rem.goodsId" @click="goToCategory">
                  <img :src="rem.image" alt="" width="80%">
                  <div class="recommand-goodsName">{{rem.goodsName}}{{rem.goodsName}}</div>
                  <div class="recommand-price">￥{{rem.price | moneyFilter}}(￥{{rem.mallPrice | moneyFilter}})</div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
        <!-- 商品层 -->
        <div v-for="(floor, index) in floorArray" :key="index"><v-floor :floorData="indexData[floor]" :floorTitle="indexData.floorName[floor]" @click="goToCategory"></v-floor></div>
        <!-- 热销商品 -->
        <div>
          <van-list>
            <van-row>
              <van-col span="12" v-for="(value, index) in indexData.hotGoods" :key="index">
                <v-hot-goods :id="value.goodsId" :name="value.name" :span="10" :price="value.price" :mallPrice="value.mallPrice" :image="value.image"></v-hot-goods>
              </van-col>
            </van-row>
          </van-list>
        </div>
    </div>
    <div style="padding-bottom: 50px;">
      <van-list>
        <van-row>
          <van-col span="12" v-for="(value, index) in goods" :key="index">
            <v-hot-goods :id="value.GOODS_ID" :name="value.NAME" :span="10" :price="value.PRESENT_PRICE" :mallPrice="value.ORI_PRICE" :image="value.IMAGE1"></v-hot-goods>
          </van-col>
        </van-row>
      </van-list>
    </div>
  <van-dialog v-model="show" :showConfirmButton='false'>
    <van-area :area-list="areaList" :columns-num="3" @confirm="show = false" @cancel="show = false"/>
  </van-dialog>
</div>
</template>

<script>
import {home} from '@/assets/service/url/home.js'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import VFloor from '@/components/component/FloorComponent'
import VHotGoods from '@/components/component/HotGoodsComponent'
import {toMoney} from '@/assets/js/filter/moneyFilter.js'
import 'swiper/dist/css/swiper.css'
// vant是24列栅格布局
export default {
  data () {
    return {
      show: false,
      goods: null,
      floorArray: ['floor1', 'floor2', 'floor3'],
      indexData: null,
      swiperOptions: {
        slidesPerView: 3,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        recommandList: []
      },
      id: '2c9f6c946016ea9b016016f79c8e0000',
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
          // ....
        }
      }
    }
  },
  computed: {
  },
  components: {
    VFloor,
    swiper,
    swiperSlide,
    VHotGoods
  },
  created () {
    this.getCommodityList()
  },
  methods: {
    goToCategory () {
      this.$router.push('/Category')
    },
    getCommodityList () {
      this.$httpServer(home.index).then((res) => {
        this.indexData = res.data.message.data
        console.log(this.indexData)
      })
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
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
        padding: 0 .3rem;
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
