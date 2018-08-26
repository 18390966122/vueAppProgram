<!--  -->
<template>
  <div class="login-panel">
      <van-nav-bar
        title="用户名"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft()"
      />
      <van-cell-group class="login-form">
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          icon="clear"
          placeholder="请输入用户名"
          @click-icon="username=''"
          :error-message="errorUsername"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :error-message="errorPassword"
        />
      </van-cell-group>
      <van-button type="primary" class="login-button" @click="postlogin" :loading="openLoading">登录</van-button>
      <br/>
      <br/>
      <br/>
      <van-button type="primary" class="login-button" @click="toRegister" :loading="openLoading">免费注册</van-button>
  </div>
</template>

<script>
import {home} from '@/assets/service/url/home.js'
import errorTips from '@/assets/js/validate/errorTips.js'
import validate from '@/assets/js/validate/validate.js'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      openLoading: false, // 防重复提交
      errorUsername: '',
      errorPassword: ''
    }
  },
  methods: {
    toRegister () {
      this.$router.push('/Register')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    postlogin () {
      this.checkForm() && this.login()
    },
    login () {
      this.openLoading = true
      this.$httpServer(home.login, {username: this.username, password: this.password}).then((res) => {
        this.$router.push('/')
        localStorage.setItem('userInfo', this.username)
        console.log()
        this.openLoading = false
      }).catch(() => {
        this.openLoading = false
      })
    },
    checkForm () {
      this.errorUsername = ''
      this.errorPassword = ''
      if (this.username !== '' && validate.isUsername(this.username)) {
      } else {
        this.errorUsername = errorTips.auth.username.error
      }
      if (this.password !== '' && validate.isPassword(this.password)) {
      } else {
        this.errorPassword = errorTips.auth.password.error
      }
      if (this.errorUsername === '' && this.errorPassword === '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang='less' scoped>
.login-panel {
  .login-form {
    margin-top: 10px;
  }
  .login-button {
    width: 100%;
    margin: 10px auto;
  }
}
</style>
