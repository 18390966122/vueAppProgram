<template>
  <div class="person-center">
    <p class="content">这是个人中心页面</p>
    <div class="quit-button">
      <van-button type="primary" @click="quit" style="width: 20rem;">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonCenter',
  methods: {
    quit () {
      localStorage.removeItem('userInfo')
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped lang="less">
.person-center {
  background-color: aliceblue;
  .content {
    font-size: 20px;
    position: absolute;
    top: 30%;
    left: 50%;
    color: #cccccc;
    transform: translate(-50%);
  }
  .quit-button {
    position: absolute;
    bottom: 5rem;
  }
}
</style>
