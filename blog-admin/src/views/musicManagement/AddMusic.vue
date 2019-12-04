<template>
  <div class="alert-wrap">
    <alert
      :alert.sync="alert"
      @close="closeAlert()">
      <div class="alert-content">
        <el-form :model="ruleForm" status-icon :label-position="'left'" :rules="rules" ref="ruleForm" label-width="120px">
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
          <el-form-item label="歌曲名称：" prop="title">
            <el-input
              v-model="ruleForm.title"
              placeholder="请输入歌曲名称：">
            </el-input>
          </el-form-item>
          <el-form-item label="歌曲链接：" prop="music_file_url">
            <!-- <el-input
              v-model="ruleForm.music_file_url"
              placeholder="请输入歌曲链接：">
            </el-input> -->
            <upload-img
                :type="'music_file_url'"
                url="api/upload"
                :size="20"
                :fileType="['mp3']"
                @uploadResponse="musicUploadSuccess"
                @uploadFail="imgUploadFail">
                <div class="upload-slot-text" v-if="!ruleForm.music_file_url">
                  选择歌曲
                </div>
                <p v-else style="word-break: break-all;">{{ ruleForm.music_file_url }}</p>
            </upload-img>
          </el-form-item>
          <el-form-item label="歌手名称：" prop="name">
            <el-input
              v-model="ruleForm.artist"
              placeholder="请输入歌手名称">
            </el-input>
          </el-form-item>
          <el-form-item label="歌词：" prop="lrc">
            <el-input
              v-model="ruleForm.lrc"
              placeholder="请输入歌词：">
            </el-input>
          </el-form-item>
          <el-form-item label="歌曲顺序：" prop="name">
            <el-input
              v-model.number="ruleForm.order"
              placeholder="请输入歌曲顺序：">
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
    props: ['music', 'alert'],
    data() {
      return {
        // 表单数据
        ruleForm: {
          title: '',
          cover: '',
          artist: '',
          lrc: '',
          music_file_url: '',
          order: 0
        },
        // 规则
        rules: {
          title: [
            { required: true, message: '请输入歌曲名称', trigger: 'blur' }
          ],
          music_file_url: [
            { required: true, message: '请输入歌曲链接', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      'alert.showalert' (val) {
        if (val && this.music) {
          this.ruleForm = this.music
        }
      }
    },
    methods: {
      restore() {
        this.ruleForm = {
          title: '',
          cover: '',
          artist: '',
          lrc: '',
          music_file_url: '',
          order: 0
        }
      },
      // 主图上传
      imgUploadSuccess(res) {
        console.log('图片上传回调', res)
        const img =  new Image()
        img.src = res.url
        img.onload = () => {
          this.ruleForm.cover = res.url
        }
      },
      imgUploadFail() {
        this.$message({ type: 'error', message: '图片上传出错' })
      },
      musicUploadSuccess(res) {
        this.ruleForm.music_file_url = res.url
      },
      // 关闭弹窗
      closeAlert() {
        this.$refs.ruleForm.resetFields()
        this.restore()
        this.$emit('close')
      },
      // 确认
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          let _data = Object.assign({}, this.ruleForm)
          if (valid) {
            this.$http.post('api/players', _data).then((data) => {
              if (this.music) {
                this.$message.success('编辑音乐成功')
              } else {
                this.$message.success('新增音乐成功')
              }
              this.restore()
              this.$emit('submit', data.data)
            }).catch(err => {
              console.log('错误信息', err)
            })
          } else {
            return false
          }
        })
      }
    },
    created() {
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
</style>
