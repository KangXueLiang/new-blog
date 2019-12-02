<template>
  <div class="upload-outer">

    <slot></slot>
    <div class="file-input">
      <input type="file" ref="card" @change="fileChange" />
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      uploadLoading: false, // 上传中状态
      fileName: '' // 文件名
    }
  },
  props: {
    // 循环上传时用
    index: {
      type: Number,
      default: 0
    },
    // 用来一个页面多处上传时用
    type: { 
      type: String,
      default: ''
    },
    url: { // 上传地址
      type: String,
      required: true
    },
    size: { // 文件大小 M
      type: Number,
      default: 2
    },
    // 支持的文件类型，Array<String> ['image/jpge', 'image/png', 'xlsx']
    fileType: {
      type: Array,
      default: function () {
        return ['image/jpge', 'image/png', 'jpg', 'png', 'webp']
      }
    }
  },
  mounted () {
  },
  methods: {
    // 文件改变
    fileChange () {
      if (this.uploadLoading) {
        this.$message({ message: '图片正在上传中，请稍候再试', type: 'warning' })
        this.$refs.card.value = ''
        return
      }
      const file = this.$refs.card.files[0]
      this.fileName = file.name
      if (!file) {
        this.$message({ message: '获取文件失败，请重新上传', type: 'warning' })
        this.$refs.card.value = ''
        return false
      }
      this.uploadLoading = true
      this.$emit('uploadBegin', this.type, this.index)
      // （某些浏览器获取到的type有有误，暂用文件名后缀判断类型） let fileType = file.type // 文件类型
      let fileType
      !fileType && (fileType = file.name.match(/\.([a-zA-Z]+)$/)[1])
      console.log(fileType)
      const pass = this.fileType.some(e => { return e === fileType })
      const size = file.size <= (1024 * 1024) * this.size
      if (!pass) {
        this.$message({ message: '不支持该文件格式', type: 'warning' })
        this.$refs.card.value = ''
        this.uploadLoading = false
        return
      }
      if (!size) {
        this.$message({ message: `文件不可超过 ${this.size}M`, type: 'warning' })
        this.$refs.card.value = ''
        this.uploadLoading = false
        return
      }
      // 格式正确，且大小正常，开始上传
      if (pass && size) {
        this.uploadFile(file)
      }
    },
    // 开始上传
    uploadFile (file) {
      let formData = new FormData()
      formData.append('file', file)
      let headers = {'Content-Type': 'multipart/form-data'}
      this.$http.post(this.url, formData, headers)
        .then(res => {
          this.uploadLoading = false
          if (res.data) {
            this.$refs.card.value = ''
            this.$emit('uploadResponse', res.data, this.type, this.index, this.fileName)
          }
        })
        .catch((error) => {
          this.$refs.card.value = ''
          this.uploadLoading = false
          this.$emit('uploadFail', error, this.type, this.index)
          this.$message({ message: '上传失败', type: 'warning' })
        })
    }
  },
  computed: {
  },
  components: {
  },
  watch: {
  }
}
</script>
<style lang="scss">
  .upload-outer{
    position: relative;
    display: inline-block;
    .file-input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      input[type='file']{
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
</style>


