<template>
  <div class="category">
    <van-nav-bar
      title="商品类别列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-row class="content">
      <van-col span="8">
        <van-list id="leftNav" class = "left-nav">
          <van-cell v-for="(item, index) in category" :title="item.MALL_CATEGORY_NAME" :key="index"
          @click="getCategoryActive(item.ID)"
          :class="{categoryActive: categoryActiveIndex == item.ID}"/>
        </van-list>
      </van-col>
      <van-col span="16" class="right-nav">
        <van-tabs v-model="categorySubActive" swipeable class="categorysub-nav">
          <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                class="good-list"
                :style="{height: bodyHeight - 140 + 'px'}">
                <div v-for="(item, index) in categoryList" :key="index" class="list-content" @click="goToGoodsInfo(item)">
                  <van-row>
                    <van-col span="8">
                      <div class="list-img">
                        <img :src="item.PICTURE_COMPERSS_PATH" alt="">
                      </div>
                    </van-col>
                    <van-col span="16">
                      <p class="list-detail">{{item.NAME}}</p>
                      <p class="list-detail">￥{{item.PRESENT_PRICE | moneyFilter}}(￥{{item.ORI_PRICE | moneyFilter}})</p>
                    </van-col>
                  </van-row>
                </div>
              </van-list>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {category} from '@/assets/service/url/home.js'
import {toMoney} from '@/assets/js/filter/moneyFilter.js'
export default {
  name: 'category',
  created () {
    this.getCategory()
    this.getCategoryActive(1)
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  data () {
    return {
      bodyHeight: 0,
      categorySubActive: 0,
      category: null,
      categoryActiveIndex: 1,
      categorySub: null,
      loading: false,
      finished: false,
      categoryList: [],
      categorySubId: '',
      list: [],
      sum: 0,
      isLoading: false,
      page: 1,
      num: 6
    }
  },
  mounted () {
    this.bodyHeight = document.documentElement.clientHeight || document.body.clientHeight
    document.getElementById('leftNav').style.height = this.bodyHeight - 46 + 'px'
  },
  methods: {
    goToGoodsInfo (item) {
      this.$router.push({name: 'goodsInfo', params: {goodsId: item.GOODS_ID}})
    },
    onRefresh () {
      setTimeout(() => {
        this.categoryList = []
        this.isLoading = false
        this.onLoad()
        this.page = 1
      }, 500)
    },
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySub[this.categorySubActive].ID ? this.categorySub[this.categorySubActive].ID : this.categorySubId[0].ID
        this.getCategoryList(this.categorySubId)
      }, 1000)
    },
    getCategoryList (categorySubId) {
      this.$httpServer(category.getCategorySubGoodsById, {subId: categorySubId, page: this.page, num: this.num}).then(res => {
        this.categoryList = this.categoryList.concat(res.data.data)
        this.loading = false
        this.page++
        if (res.data.data.length === 0) {
          this.finished = true
        }
      })
    },
    getCategoryActive (categoryId) {
      this.finished = false
      this.categoryList = []
      this.categoryActiveIndex = categoryId
      this.categorySubActive = 0
      this.$httpServer(category.getCategorySubList, {categoryId: categoryId}).then(res => {
        this.finished = false
        this.page = 1
        this.categorySub = res.data.data
        this.getCategoryList(this.categorySub[0].ID)
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    getCategory () {
      this.finished = false
      this.categoryList = []
      this.$httpServer(category.getCategory).then((res) => {
        this.category = res.data.data
      })
    }
  },
  watch: {
    categorySubActive (newVal) {
      this.finished = false
      this.categoryList = []
      this.page = 1
      this.getCategoryList(this.categorySub[newVal].ID)
      this.onLoad()
    },
    category () {
      this.categoryList = []
      this.page = 1
    }
  }
}
</script>

<style scoped lang="less">
.category{
  height: 100%;
  overflow: hidden;
  .content {
    overflow: hidden;
    .left-nav {
      border-right: 1px solid #ccc;
      .categoryActive {
        background-color: beige;
      }
    }
    .right-nav {
      overflow-y: auto;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
      .categorysub-nav {
        font-size: 12px;
        .good-list {
          overflow: scroll;
          .list-content {
            padding: .4rem;
            .list-img {
              height: 4rem;
              img {
                display: inline-block;
                height: 100%;
              }
            }
            .list-detail {
              display: block;
              width: 8rem;
              white-space: normal;
              font-size: 14px;
              line-height: 1.6rem;
            }
          }
        }
      }
    }
  }
}
</style>
