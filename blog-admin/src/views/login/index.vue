<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="loginForm" :model="loginForm" auto-complete="on" label-position="left">
        <div class="logo">
          <img src="./../../assets/LOGO.png" alt="logo">
        </div>
        <div class="hr">
          <div></div>
        </div>
        <div class="title">
          <span>博客后台管理系统</span>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model="loginForm.account" name="username" type="text" auto-complete="on" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="padding: 15px 0;background-color: #0457b7; border: none;width:100%;margin-top: 30px;font-size: 16px;border-radius: 30px;height: 50px" @click.native.prevent="handleLogin">登录系统</el-button>  
        <el-tooltip class="item" effect="dark" content="忘记密码请联系管理员" placement="top">
          <p class='tip'>忘记密码？</p>
        </el-tooltip>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
        extra: {
          logintype: 1
        }
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      console.log('begin login')
      this.loading = true
      let _data = {}
      _data.email = this.loginForm.account
      _data.password = this.loginForm.password
      this.$store.dispatch('Login', _data).then(() => {
        this.loading = false
        this.$router.push({ path: this.redirect || '/' })
      }).catch(() => {
        this.loading = false
      })
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
/* reset element-ui css */
.login-container {
  background-color: #2196F3;
  background-image: url('../../assets/bj.jpg');
  background-size: cover;
  .el-form-item__content {
    line-height: 50px;
  }
  .el-input {
    display: inline-block;
    height: 50px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 50px;
      border-radius: 25px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #606266 !important;
      }
    }
  }
  .el-form-item {
    height: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #fff;
    border-radius: 25px;
    margin-bottom: 1.5em;
    margin-top: 20px;
    flex-basis: 100%;
    -webkit-flex-basis: 100%;
    overflow: hidden;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .login-form {
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      text-align: center;
      img {
        width: 85%;
      }
    }
    .hr {
      text-align: center;
      margin: 30px 0 18px;
      width: 100%;
      div {
        display: inline-block;
        width: 40px;
        height: 2px;
        background-color: rgb(4, 87, 183);
      }
    }
    .title {
      color: #606266;
      font-size: 20px;
      margin-bottom: 60px;
    }
    form {
      max-width: 550px;
      margin: 0 5vw;
      background: rgba(255, 255, 255, 0.17);
      padding: 4.5vw;
      box-sizing: border-box;
      display: -webkit-flex;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      border-radius: 30px 30px 50px 50px;
    }
  }
  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    width: 30px;
    display: inline-block;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .tip {
    margin-top: 24px;
    font-size: 14px;
    color: rgb(4, 87, 183);
    cursor: pointer;
    font-weight: 500;
  }
}
</style>
