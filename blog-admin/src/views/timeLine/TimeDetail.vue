<template>
  <div class="article-alert-wrap">
    <alert
      :alert.sync="alert"
      @close="closeAlert()">
      <div class="alert-content">
        <el-form :model="ruleForm" status-icon :label-position="'left'" ref="ruleForm" label-width="120px">
          <el-form-item label="标题：" prop="title">
            <el-input
              v-model.number="ruleForm.title"
              placeholder="请输入标题">
            </el-input>
          </el-form-item>
          <el-form-item label="发生时间：" prop="title">
            <el-date-picker
              v-model="ruleForm.release_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="封面图：" prop="cover">
            <upload-img
                :type="'cover'"
                url="api/upload"
                @uploadResponse="imgUploadSuccess"
                @uploadFail="imgUploadFail">
                <div class="upload-slot-text" v-if="!ruleForm.cover">
                  选择图片
                </div>
                <img v-else :src="ruleForm.cover" alt="封面图片">
            </upload-img>
          </el-form-item>
          <el-form-item label="简介：" prop="introduction">
            <el-input
              type="textarea"
              v-model="ruleForm.introduction"
              placeholder="请输入简介"
              >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="modal-container-footer">
          <div class="modal-container-center">
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="closeAlert()">取消</el-button>
          </div>
        </div>
      </div>
    </alert>
  </div>
</template>
<script>
  import UploadImg from '@/components/UploadImg'
  export default {
    components: {
      UploadImg
    },
    props: ['time', 'alert'],
    data() {
      return {
        // 表单数据
        ruleForm: {
          title: '',
          cover: '', // 封面图片
          introduction: '', // 标签
          release_date: '' // 文章状态
        }
      }
    },
    watch: {
      'alert.showalert' (val) {
        if (this.time && val) {
          this.ruleForm = Object.assign({}, this.time)
        } else {
          this.ruleForm = {
            title: '',
            cover: '',
            introduction: '',
            release_date: ''
          }
        }
      }
    },
    methods: {
      restore() {
      },
      // 主图上传
      imgUploadSuccess(res) {
        console.log('图片上传回调', res)
        const that = this
        const img =  new Image()
        img.src = res.url
        img.onload = function() {
          that.ruleForm.cover = res.url
        }
      },
      imgUploadFail() {
        this.$message({ type: 'error', message: '图片上传出错' })
      },
      // 关闭弹窗
      closeAlert() {
        this.$refs.ruleForm.resetFields()
        this.restore()
        this.$emit('close')
      },
      // 确认
      submitForm() {
        let _data = Object.assign({}, this.ruleForm)
        this.$http.post('api/abouts', _data).then((res) => {
          if (_data._id) {
            this.$message.success('编辑时间轴成功')
          } else {
            this.$message.success('新增时间轴成功')
          }
          this.restore()
          this.$emit('submit', res)
        }).catch(err => {
          console.log('错误信息', err)
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .alert-content {
    padding: 20px;
    .el-form-item__label {
      text-align: right;
      padding-right: 10px;
    }
    .el-select {
      width: 100%;
    }
    .modal-container-center {
      text-align: center;
      button {
        margin-top: 20px;
        width: 100px;
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: middle;
  }
</style>
