<template>
  <div class="alert-wrap">
    <alert
      :alert.sync="alert"
      @close="closeAlert()">
      <div class="alert-content">
        <el-form :model="ruleForm" status-icon :label-position="'left'" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item label="友链名称：" prop="name">
            <el-input
              v-model.number="ruleForm.name"
              placeholder="请输入友链名称">
            </el-input>
          </el-form-item>
          <el-form-item label="友链地址：" prop="link">
            <el-input
              v-model.number="ruleForm.link"
              placeholder="请输入友链地址">
            </el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="description">
            <el-input
              type="textarea"
              v-model="ruleForm.description"
              placeholder="请输入友链描述"
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
  export default {
    components: {
    },
    props: ['friendLink', 'alert'],
    data() {
      return {
        // 表单数据
        ruleForm: {
          name: '',
          link: '',
          description: ''
        },
        // 规则
        rules: {
          name: [
            { required: true, message: '请输入友链名称', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入友链地址', trigger: 'blur' }
          ],
          description: [
            { required: false }
          ]
        }
      }
    },
    watch: {
      'alert.showalert' (val) {
        if (val && this.friendLink) {
          this.ruleForm.name = this.friendLink.name
          this.ruleForm.link = this.friendLink.link
          this.ruleForm.description = this.friendLink.description
        }
      }
    },
    methods: {
      restore() {
        this.ruleForm = {
          name: '',
          link: '',
          description: ''
        }
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
          let _data = {
            name: this.ruleForm.name,
            link: this.ruleForm.link,
            description: this.ruleForm.description
          }
          if (this.friendLink) {
            _data.id = this.friendLink._id
          }
          if (valid) {
            this.$http.post('api/friendLink/edit', _data).then(() => {
              if (this.friendLink) {
                this.$message.success('编辑分类成功')
              } else {
                this.$message.success('新增分类成功')
              }
              this.restore()
              this.$emit('submit')
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
