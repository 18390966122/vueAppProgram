<!--  -->
<template>
  <div class="register-panel">
      <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft()"
      />
      <van-cell-group class="register-form">
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          @click-icon="username=''"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <van-button type="primary" class="register-button" @click="register">注册</van-button>
  </div>
</template>

<script>
import {home} from '@/assets/service/url/home.js'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    register () {
      this.$httpServer(home.register, {username: this.username, password: this.password}).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.register-panel {
  .register-form {
    margin-top: 10px;
  }
  .register-button {
    width: 100%;
    margin: 10px auto;
  }
}
</style>
