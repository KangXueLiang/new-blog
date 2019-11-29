<template>
  <el-menu class="navbar" mode="horizontal" :class="{'left-220': sidebar.opened && !sidebar.isMobile, 'left-0': sidebar.isMobile}">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" v-if="sidebar.isMobile" />
    <breadcrumb />
    <div class="nav-menu-container" :class="{'nav-menu-container-mobile':sidebar.isMobile}">
      <el-dropdown size="small" class="sls-avatar-container" trigger="click">
        <div class="sls-avatar-wrapper">
          <!--<div style="display: flex;align-items: center;height: 40px;width: 40px;border-radius: 50%;border:1px solid #e3e3e3;overflow: hidden">-->
            <!--<img :src="avatarImg" alt="头像" style="width: 100%;">-->
          <!--</div>-->
          <div class="sls-user-avatar"><img :src="userInfo ? (userInfo.avator ||  'https://image.shanglishi.com/t_icon_user1.png') : 'https://image.shanglishi.com/t_icon_user1.png'"></div>
          <div style="margin: 0 10px">
            <span>{{name ? name : ''}}</span>
          </div>
          <div>
            <i class="el-icon-arrow-down"></i>
          </div>
          <!-- <div class="sls-user-jobandname" v-if="userinfo">
            <h3>{{userinfo.name}}</h3> -->
            <!--<p>{{userinfo.enterprise_manager === 1? '超级管理员' : '普通管理员'}}</p>-->
            <!--<p>{{userinfo.position}}</p>-->
          <!-- </div>
          <i class="el-icon-caret-bottom"></i> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="sls-avatar-lists-wrap">
          <el-dropdown-item><div @click="go('userCenter')">个人中心</div></el-dropdown-item>
          <!-- <el-dropdown-item v-has="['menu-user-management-index']"><div @click="go('user')">用户管理</div></el-dropdown-item>
          <el-dropdown-item v-has="['menu-role-management-index']"><div @click="go('role')">角色管理</div></el-dropdown-item> -->
          <el-dropdown-item><div @click="logout">退出账户</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    // 超级管理员隐藏我的资料
    handleAdmin() {
      return this.$store.getters.userInfo.account !== 'admin'
    },
    // 页面跳转
    go(path) {
      // console.log('页面跳转', this.$store.getters.userInfo.id)
      let userId = this.$store.getters.userInfo.id
      if (path === 'myProfile') {
        this.$router.push({
          path: `/saveCommon/personnel`,
          query: {
            id: userId,
            profile: true
          }
        })
      } else {
        this.$router.push({
          path: `/userCenter/index`
        })
      }
    },
    // 登出
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        // this.$message.success('退出成功, 即将返回登录界面')
        // setTimeout(() => {
        //   location.reload()
        // }, 1000)
        // this.$message.success('退出登录')
        location.href = '/login'
        // location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch((err) => {
        console.log(err)
        window.localStorage.removeItem('userinfo')
        window.localStorage.removeItem('token')
        location.href = '/login'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.left-220 {
  margin-left: 220px!important;
}
// 移动端适配
.left-0 {
  margin-left: 0!important;
}
.navbar {
  height: 70px;
  line-height: 70px;
  border-radius: 0px !important;
  background-color: $navbarBg;
  // border-bottom: none!important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 10;
  margin-left: 70px;
  transition: all .28s;
  // box-shadow:0px 0px 8px 0px rgba(0,0,0,0.15);
  .hamburger-container {
    padding: 0 8px;
    padding-top: 3px;
    line-height: 70px;
    height: 70px;
    float: left;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .nav-menu-container {
    position: absolute; 
    height: 70px;
    right: 24px;
    top: 0;
    display: flex;
    align-items: center;
    .nav-icon {
      height: 70px;
      padding: 0 8px;
      cursor: pointer;
      i {
        color: #fff;
        font-size: 24px;
        position: relative;
      }
      i::after {
        content: '';
        position: absolute;
        z-index: 4;
        left: -15%;
        top: -15%;
        border-radius: 50%;
        width: 130%;
        height: 130%;
        background-color: rgba(255,255,255,0);
        transition: .3s cubic-bezier(.25,.8,.5,1);
      }
      &:hover i::after {
        background-color: rgba(255,255,255,0.2);
      }
    }
    .sls-avatar-container {
      position: relative;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      top:0;
      margin-left: 8px;
      .sls-avatar-wrapper {
        cursor: pointer;
        position: relative;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        // width: 130px;
        .sls-user-avatar::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: -22%;
          top: -22%;
          border-radius: 50%;
          width: 140%;
          height: 140%;
          background-color: rgba(255,255,255,0);
          transition: .3s cubic-bezier(.25,.8,.5,1);
        }
        // &:hover .sls-user-avatar::after {
        //   background-color: #e4e9ed;
        // }
        .sls-user-avatar {
          position: relative;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border:1px solid #e6e6e6;
          display: flex;
          justify-content: center;
          align-content: center;
          align-items: center;
          img{
            width: 100%;
            height:auto;
          }
        }
        .sls-user-jobandname {
          line-height: 1.4;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          max-width: 120px;
          h3 {
            color: #fff;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          h3,p{
            margin: 0;
            padding: 0;
          }
          p{
            font-size: 12px;
            color: #909399;
          }
          margin: 10px;
          margin-right: 10px;
          height: 40px;
        }
        .el-icon-caret-bottom {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .nav-menu-container-mobile {
    right: 8px;
    .nav-icon {
      padding: 0 4px;
      i {
        font-size: 22px;
      }
    }
    .sls-avatar-container {
      margin-left: 8px;
    }
  }
}
@media(max-width:1040px) {
  .navbar {
    margin-left: 0!important;
  }
}
</style>

