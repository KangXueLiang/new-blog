<template>
  <div class="alert-wrap">
    <alert
      :alert.sync="alert"
      @close="closeAlert()">
      <div class="alert-content">
        <el-form :model="ruleForm" status-icon :label-position="'left'" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item label="分类名称：" prop="name">
            <el-input
              v-model.number="ruleForm.name"
              placeholder="请输入分类名称">
            </el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="description">
            <el-input
              type="textarea"
              v-model="ruleForm.description"
              placeholder="请输入分类描述"
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
    props: ['category', 'alert'],
    data() {
      return {
        // 表单数据
        ruleForm: {
          name: '',
          description: ''
        },
        // 规则
        rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ],
          description: [
            { required: false }
          ]
        }
      }
    },
    watch: {
      'alert.showalert' (val) {
        if (val && this.category) {
          this.ruleForm.name = this.category.name
          this.ruleForm.description = this.category.description
        }
      }
    },
    methods: {
      restore() {
        this.ruleForm = {
          name: '',
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
            description: this.ruleForm.description
          }
          if (this.category) {
            _data.id = this.category._id
          }
          if (valid) {
            this.$http.post('api/category/edit', _data).then(() => {
              if (this.category) {
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
