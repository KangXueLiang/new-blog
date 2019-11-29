<template>
  <div class="container user-center-wrap common-container">
    <main>  
      <el-tabs tab-position="left" height="100%;" >
        <el-tab-pane label="个人中心">
          <user-info></user-info>
        </el-tab-pane>
        <el-tab-pane label="工作经历">
          <work-experience></work-experience>
        </el-tab-pane>
        <el-tab-pane label="项目经历">
          <program-experience></program-experience>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <modify-password></modify-password>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>
<script>
  import ModifyPassword from './components/ModifyPassword'
  import UserInfo from './components/UserInfo'
  import WorkExperience from './components/WorkExperience'
  import ProgramExperience from './components/ProgramExperience'
  export default {
    components: {
      ModifyPassword,
      UserInfo,
      WorkExperience,
      ProgramExperience
    },
    data() {
      return {
      }
    },

  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .user-center-wrap {
    .el-tabs--left .el-tabs__header.is-left {
      padding: 0 0 16px 16px;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  // 主体样式
  .user-center-wrap {
    height: 100%;
    min-height: 100%;
    main {
      overflow-y: auto;
      background-color: #fff;
      height: 100%;
    }
  }
</style>

