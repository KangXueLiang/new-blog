<template>
  <iframe v-if="$route.query.src" ref="iframe" :src="$route.query.src" class="iframe" />
  <iframe v-else ref="iframe" :src="urlPath" class="iframe" />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
export default {
  name: 'Frame',
  components: {
    ...mapGetters(['tagList']),
    tagListNum: function() {
      return this.tagList.length !== 0
    },
    ...mapState({
      name: state => state.user.name
    })
  },
  props: {
    routerPath: {
      type: String,
      default: String
    }
  },
  data() {
    return {
      urlPath: this.getUrlPath() // iframe src 路径
    }
  },
  watch: {
    $route: function() {
      this.load()
    },
    routerPath: function(val) {
      // 监听routerPath变化，改变src路径
      this.urlPath = this.getUrlPath()
      console.log(val)
    }
  },
  mounted() {
    this.load()
    this.resize()
  },
  created() {
    NProgress.configure({ showSpinner: false })
  },
  methods: {
    // 显示等待框
    show() {
      NProgress.start()
    },
    // 隐藏等待狂
    hide() {
      NProgress.done()
    },
    // 加载浏览器窗口变化自适应
    resize() {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    // 加载组件
    load() {
      this.show()
      var flag = true // URL是否包含问号
      if (this.$route.query.src.indexOf('?') === -1) {
        flag = false
      }
      var list = []
      for (var key in this.$route.query) {
        if (key !== 'src' && key !== 'name') {
          list.push(`${key}= this.$route.query[key]`)
        }
      }
      list = list.join('&').toString()
      if (flag) {
        this.$route.query.src = `${this.$route.query.src}${
          list.length > 0 ? `&list` : ''
        }`
      } else {
        this.$route.query.src = `${this.$route.query.src}${
          list.length > 0 ? `?list` : ''
        }`
      }
      // 超时3s自动隐藏等待狂，加强用户体验
      let time = 3
      const timeFunc = setInterval(() => {
        time--
        if (time === 0) {
          this.hide()
          clearInterval(timeFunc)
        }
      }, 1000)
      this.iframeInit()
    },
    // iframe窗口初始化
    iframeInit() {
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - 200
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      } else {
        iframe.onload = () => {
          this.hide()
        }
      }
    },
    getUrlPath: function() {
      // 获取 iframe src 路径
      let url = window.location.href
      url = url.replace('/myiframe', '')
      return url
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.iframe {
  position: absolute;
  width: 100%;
  height: 100%!important;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
