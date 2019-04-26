<template>
  <div class="user-center-wrap common-container">
    <main>
      <tab :lists="tabLists"></tab>
      <div class="user-center-main">
        <section>
          <div class="left-wrap">
            <i class="iconfont icon-suoding"></i>
          </div>
          <div class="right-wrap">
            <p><span>为保障您的账户安全，建议定期更换密码！</span></p>
            <el-button type="primary" plain @click="openAlert()">修改密码</el-button>
          </div>
        </section>
      </div>
    </main>
    <!--修改密码-->
    <alert 
    :alert.sync="alert"
    @close="closeAlert()">
      <div>
        <ul class="alert-wrap">
          <li>
            <div class="left">
              <span >用户姓名：</span>
            </div>
            <div class="right mobile">
              <span>{{userInfo.name}}</span>
            </div>
          </li>
          <li>
            <div class="left">
              <span >登录账号：</span>
            </div>
            <div class="right mobile">
              <span>{{userInfo.account}}</span>
            </div>
          </li>
          <!-- <li>
            <div class="left">
              <span>输入原密码：</span>
            </div>
            <div class="right">
              <el-input type="password" placeholder="请输入原密码" v-model="oldPassword" clearable style="margin-left: 10px;height: 42px; outline: none;line-height: 42px;"></el-input>
            </div>
          </li> -->
          <li>
            <div class="left">
              <span>输入新密码：</span>
            </div>
            <div class="right">
              <el-input type="password" placeholder="请输入新密码" v-model="newPassword1" clearable style="margin-left: 10px;height: 42px; outline: none;line-height: 42px;"></el-input>
            </div>
          </li>
          <li>
            <div class="left">
              <span>确认新密码：</span>
            </div>
            <div class="right">
              <el-input type="password" placeholder="请再次输入新密码" v-model="newPassword2" clearable style="margin-left: 10px;height: 42px; outline: none;line-height: 42px;"></el-input>
            </div>
          </li>
        </ul>
        <div class="alert-container-footer">
          <div>
            <el-button @click="closeAlert()">取消</el-button>
            <el-button type="primary" @click="sure()" v-loading="loading">确 定</el-button>
          </div>
        </div>
      </div>
    </alert>
    <!-- 重置成功 -->

  </div>
</template>
<script>
  import Tab from '@/components/Tabs/index'
  export default {
    components: {
      Tab
    },
    data() {
      return {
        tabLists: [{
          id: 0,
          name: '个人中心'
        }],
        loading: false,
        alert: {
          title: '修改密码',
          footer: false, // 自定义是打开 div  ---> slot ---> footer
          width: 600, // 默认600px，为了响应式, max-width 为90% 非必传
          showalert: false
        },
        oldPassword: '', // 旧密码
        newPassword1: '', // 新密码
        newPassword2: '' // 新密码
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    methods: {
      // 关闭弹窗
      closeAlert() {
        this.alert.showalert = false
      },
      // 打开弹窗
      openAlert() {
        this.alert.showalert = true
      },
      // 登出
      fedLogOut() {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      
      // 确定修改
      sure() {
        // 首先校验输入框内容
        if (!this.newPassword1) {
          this.$message.error('请输入新密码')
          return
        } else if (!this.newPassword2) {
          this.$message.error('请再次输入新密码')
          return
        } else if (this.newPassword1 !== this.newPassword2) {
          this.$message.error('两次输入的密码不一致')
          return
        } else if (this.newPassword1.length < 6 || this.newPassword1.length > 20) {
          this.$message.error('请设置6-20位密码')
          return
        } else {
          this.submit()
          .then(() => {
            // 成功，关闭弹窗
            this.$message.success('修改密码成功,即将退出登录')
            this.closeAlert()
            setTimeout(() => {
              // this.logout()
              this.fedLogOut()
              // this.$router.push({
              //   path: '/login'
              // })
            }, 1000)
          }).catch((err) => {
            console.log('错误信息', err)
          })
        }
      },
      // 提交后台
      submit() {
        this.loading = true
        return new Promise((resolve, reject) => {
          this.$http.post('api/resetPwd', {
            password: this.newPassword1,
            confirm_password: this.newPassword2
            // id: this.userInfo.id
          }).then(response => {
            this.loading = false
            const data = response.data
            resolve(data)
          }).catch(err => {
            this.loading = false
            reject(err.message)
          })
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  // 主体样式
  .user-center-wrap {
    height: 100%;
    min-height: 100%;
    background-color: #f9f9f9;
    main {
      overflow-y: auto;
      background-color: #fff;
      border: 1px solid #EBEEF5;
      height: 100%;
      .user-center-main {
        background-color: #fff;
        padding: 0 20px;
        section {
          position: relative;
          background-color: #fff;
          height: 150px;
          padding: 0 20px;
          font-size: 14px;
          color: #888;
          i {
            font-size: 80px;
            color: #e5e5e5;
          }
          &>div {
            display: inline-block;
            height: 150px;
            margin-left: 20px;
            vertical-align: middle;
          }
          .left-wrap {
            line-height: 150px;
            margin-left: 10px;
            position: absolute;
          }
          .right-wrap {
            margin-left: 115px;
            padding: 30px 0 0 30px;
            button {
              margin-top: 25px;
              width: 100px;
            }
          }
        }
      }
    }
  }
  // 弹窗样式
  .alert-wrap {
    padding: 0 60px 0 10px;
    li {
      height: 50px;
      display: flex;
      align-items: center;
      margin: 20px 0;
      .left {
        flex: 1;
        color: #353535;
      }
      .right {
        height: 100%;
        flex: 4;
        input {
          padding: 0 10px;
          width: 100%;
          height: 100%;
          border: 1px solid #E0E4E9;
        }
      }
      .mobile {
        color: #353535;
        display: flex;
        align-items: center;
        span {
          margin-left: 10px;
        }
      }
    }
  }
  .alert-container-footer {
    text-align: center;
    padding: 30px 0 20px;
    button {
      width: 110px;
    }
    button:nth-of-type(1) {
      color: #0BB27A;
    }
    button:nth-of-type(2) {
      margin-left: 20px;
    }
  }
</style>

