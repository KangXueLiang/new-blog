<template>
  <div class="alert-wrap">
    <alert
      :alert.sync="alert"
      @close="closeAlert()">
      <div class="alert-content">
        <el-form :model="ruleForm" status-icon :label-position="'left'" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item :label="alert.des" prop="name">
            <el-input
              v-model.number="ruleForm.name">
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
    props: ['alert'],
    data() {
      return {
        // 表单数据
        ruleForm: {
          name: ''
        },
        // 规则
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
    },
    methods: {
      // 关闭弹窗    
      closeAlert() {
        this.$refs.ruleForm.resetFields()
        this.$emit('close')
      },
      // 确认
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {   
          let _data = {}
          _data[`${this.alert.itemName}`] = this.ruleForm.name
          let url = this.alert.url
          if (valid) {
            this.$http.post(url, _data).then((res) => {
              this.$message.success(this.alert.successTip || '添加成功')
              this.$emit('submit', this.alert.mark, res.data)
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
