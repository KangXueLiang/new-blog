<template>
  <div class="upload-file-wrap">
    <el-dialog
      title="上传文件"
      :visible.sync="open"
      width="600px"
      @closed="cancel"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      center>
      <div>
        <div class="upload-file-item">
          <div class="left">文件名称</div>
          <div class="right">
            <el-input :placeholder="ph" v-model="fileName"></el-input>
          </div>
        </div>
        <div class="upload-file-item">
          <div class="left">选择文件</div>
          <div v-if="status === 0" class="right">
            <div class="upload-outer">
              <el-button type="primary">选择文件</el-button>
              <div class="file-input">
                <input type="file" ref="card" @change="fileChange" />
              </div>

            </div>
          </div>
          <div v-if="status === 1" class="right">
            <i class="el-icon-loading" style="margin-right: 16px"></i>
            <span>导入中...</span>
          </div>
          <div v-if="status === 2" class="right">
            <a :href="fileData.url" :download="fileData.key" style="color: #66b1ff; text-decoration: underline">
              {{fileData.key}}
            </a>
          </div>
        </div>
        <div v-if="status === 0">
          <p class="tip">支持Word 、PPT、Txt、Excel、PDF、Zip、Tar格式，10M以下</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancel">取 消</el-button> -->
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      ph: { // placeholder
        type: String,
        default: '请输入上传的文件的名称'
      },
      show: {
        type: Boolean // 是否显示该组件
      },
      url: { // 上传地址
        type: String,
        required: true
      },
      size: { // 文件大小 M
        type: Number,
        default: 10
      },
      // 支持的文件类型，Array<String> ['application/msword', 'application/vnd.ms-powerpoint', 'text/plain', 'application/vnd.ms-excel', 'application/pdf', 'aplication/zip ']
      fileType: {
        type: Array,
        default: function () {
          return ['doc', 'ppt', 'txt', 'xls', 'xlsx', 'pdf', 'zip', 'tar']
        }
      }
    },
    data () {
      return {
        fileName: '',
        status: 0,
        fileData: null,
        open: this.show
      }
    },
    watch: {
      show(val) {
        this.open = val
      }
    },
    methods: {
      // 文件改变
      fileChange () {
        const file = this.$refs.card.files[0]
        if (!file) {
          this.$message({ message: '获取文件失败，请重新上传', type: 'warning' })
          this.$refs.card.value = ''
          return false
        }
        this.status = 1
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
          this.status = 0
          return
        }
        if (!size) {
          this.$message({ message: `文件不可超过 ${this.size}M`, type: 'warning' })
          this.$refs.card.value = ''
          this.status = 0
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
            this.status = 2
            if (res.data) {
              this.fileData = res.data
              this.$message({ message: '上传成功', type: 'success' })
            }
          })
          .catch((error) => {
            this.status = 0
            this.$refs.card.value = ''
            this.$message({ message: error || '上传失败，请稍后重试', type: 'error' })
          })
      },
      // 取消
      cancel() {
        this.$emit('close')
      },
      // 还原
      reverseFrom() {
        this.status = 0
        this.fileName = '',
        this.fileData = null
      },
      // 确定，通知父组件拿到数据
      sure() {
        if (!this.fileName) {
          this.$message.error('请填写文件名称')
          return
        } else if (!this.fileData) {
          this.$message.error('请上传文件')
          return
        }
        this.$emit('submit', this.fileName, this.fileData)
        this.reverseFrom()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .upload-file-wrap {
    .upload-file-item {
      margin-bottom: 16px;
    }
    .left {
      display: inline-block;
      width: 20%;
    }
    .right {
      display: inline-block;
      width: 80%;
    }
    .tip {
      padding-left: 20%;
      font-size: 12px;
      color: #B9BEC3;
    }
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
  }
</style>