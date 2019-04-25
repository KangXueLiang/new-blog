<template>
  <div>
    <div class="logo" @click="goHome()" style="cursor: pointer">
      <img src="@/assets/logo-big.png" alt="logo" style="width: 112px" v-if="!isCollapse">
      <img src="@/assets/logo-small.png" alt="logo" style="width: 56px" v-else>
    </div>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="currentPath"
        :collapse="isCollapse"
        :unique-opened="true"
        router
        mode="vertical"
        background-color="#1C1E2B"
        text-color="#d2d9e0"
        active-text-color="#fff"
        ref="menu"
      >
        <sidebar-item v-for="route in routers" :key="route.name" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { constantRouterMap } from '@/router'


export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    routers() {
      return constantRouterMap
    }
  },
  data() {
    return {
      currentPath: this.$route.path
    }
  },
  watch: {
    // 解决当前处于不处于菜单中的路由时，菜单仍然高亮的bug
    '$route' (to) {
      if (to.meta.active) {
        this.$refs.menu.activeIndex = to.meta.active
      } else {
        this.$refs.menu.activeIndex = to.path
      }   
    }
  },
  methods: {
    goHome() {
      this.$router.push({
        path: '/home'
      })
    }
  },
  created() {
  }
}
</script>
