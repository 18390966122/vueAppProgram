<!-- 这是一个首页商品楼层组件 -->
<template>
  <div class="floor-area">
    <div class="floor-title">{{floorTitle}}</div>
    <div class="floor_one">
      <div><img :src="floorData[0].image" :id="floorData[0].goodsId" alt="" width="100%"></div>
      <div>
        <div><img :src="floorData[1].image" :id="floorData[1].goodsId" alt="" width="100%"></div>
        <div><img :src="floorData[2].image" :id="floorData[2].goodsId" alt="" width="100%"></div>
      </div>
      </div>
    <div class="floor_rule">
      <div v-for="(item, index) in floorData.slice(3)" :key="index"><img :src="item.image" alt="" :id="item.goodsId"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['floorData', 'floorTitle']
}
</script>
<style lang='less' scoped>
.floor-area {
  .floor-title {
    height: 2rem;
    font-size: 16px;
    line-height: 2rem;
    padding-left: .6rem;
    text-align: center;
    font-weight: 700;
    background-color: #f2efef;
  }
  .floor_one {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    border-top: 1px solid #eee;
    div {
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      &:nth-child(2) {
        width: 10rem;
      }
      &:nth-child(1) {
        border-right: 1px solid #eee;
      }
    }
  }
  .floor_rule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    div {
      width: 10rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      img {
        width: 100%;
      }
      &:nth-child(odd) {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
      &:nth-child(even) {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
