<template>
    <el-dialog class="sls-cluealertcom"
               :close-on-click-modal="filterConfig('closeOnClickModal')"
               :show-close="filterConfig('showClose')"
               :close-on-press-escape="filterConfig('closeOnPressEscape')"
               :class="{'sls-cluewhite': !alert.title, 'sls-clubnopadding': alert.nopadding}"
               :title="alert.title" @close="clsoeAlert" :visible="alert.showalert"
               append-to-body
               v-bind:width="alert.width?alert.width+'px':'600px'">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer">
        <div v-if="alert.footer" slot="footer" class="dialog-footer">
          <slot name="footer-left"></slot>
          <el-button @click="clsoeAlert">取 消</el-button>
          <el-button type="primary" @click="isConfirm">确 定</el-button>
        </div>
      </slot>
    </el-dialog>
</template>
<script>
export default {
  name: 'Alert',
  data() {
    return {
      show: true
    }
  },
  methods: {
    // 关闭
    clsoeAlert() {
      this.$emit('close', false)
    },
    // 确定
    isConfirm() {
      this.$emit('confirm')
    },
    // 做一些过滤的小操作吧，方便以前调用跟兼容之前版本
    filterConfig(param) {
      if (!param) {
        return false
      } else {
        if (this.alert.hasOwnProperty(param)) {
          return this.alert[param]
        } else {
          return true // 默认是为真的 // 按ele的那一套
        }
      }
    }
  },
  mounted() {
    console.log('this.alert.hasOwnProperty', this.alert.hasOwnProperty('closeOnClickModal'), this.alert['closeOnClickModal'], this.filterConfig('closeOnClickModal'))
  },
  props: ['alert']
}
</script>
<style rel="stylesheet/scss" lang="scss">
  @import '@/styles/variables.scss';
  /* 白色背景 */
  .sls-cluewhite{
    .el-dialog__header{
      height: 0 !important;
    }
    .el-dialog__header{
      background-color: transparent !important;
    }
    .el-icon-close{
      color: #303133 !important;
    }
  }
  .sls-clubnopadding{
    .el-dialog__body{
      padding: 0 !important;
    }
  }
  /* 弹窗内容 */
  .dialog-footer {
    position: relative;
    text-align: center;
    button {
      padding: 10px 25px;
    }
    button:nth-of-type(2) {
      // background-color: $purple;
      // border-color: $purple;
      margin-left: 16px;
    }
  }
  .sls-cluealertcom{
    border-radius: 12px;
    .el-dialog{
      max-width: 90%;
    }
    .el-dialog__header{
      height: 46px;
      background-color: #0BB27A;
      color: $white;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 16px;
      .el-dialog__title{
        color: $white;
        font-size: 14px;
      }
      .el-dialog__headerbtn {
        top: 14px;
        transform: rotate(0deg);
        transition: .5s;
      }
      .el-dialog__headerbtn:hover {
        transform: rotate(360deg);
      }
      .el-icon-close{
        color: $white;
        font-size: 20px;
      }
    }
  }
</style>
