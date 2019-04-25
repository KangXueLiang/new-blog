<template>
  <section class="app-main">
    <!--缓存动画-->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive> -->
    <!--不缓存动画-->
    <!-- <router-view v-if="!$route.meta.keepalive"></router-view> -->
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  position: relative;
  overflow: auto;
}
</style>
