<template>
  <div class="home-container">
    <div>
      <p style="padding: 16px 0 16px 24px; font-size: 24px;">Hi, {{userName}}，愿你每天都有一个好心情~</p>
    </div>
    <div style="width: 400px;">
      <lunar-calendar @choseDay="clickDay" ref="Calendar"></lunar-calendar>
    </div>
    <div></div>
  </div>
</template>
<script>
import LunarCalendar from 'lunar-calendar-vue2'
export default {
  components: {
    LunarCalendar
  },
  data() {
    return {
    }
  },
  computed: {
    userName() {
      return this.$store.state.user.name
    }
  },
  methods: {
    clickDay(date) {
      console.log(date)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
  .wh_content_item {
    .wh_item_date {
      transition: all .3s linear;
    }
    .wh_isToday {
      background-color: #0BB27A!important;
    }
  }
</style>