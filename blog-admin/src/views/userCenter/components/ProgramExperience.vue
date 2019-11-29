<template>
  <div class="program-experience-wrap" v-loading="loading">
    <div>
      <el-button type="primary" @click="addItem()">新增</el-button>
    </div>
    <div>
      <div v-for="item in programList" :key="item._id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.program_name}}</span>
            <el-button style="float: right; padding: 3px 6px;" type="primary" @click="changeItem(item)">修改</el-button>
            <el-button style="float: right; padding: 3px 6px;margin-right: 8px;" type="danger" @click="deleteItem(item)">删除</el-button>
          </div>
          <ul>
            <li>
              <span>项目内容：</span>
              <p>{{item.program_content}}</p>
            </li>
            <li>
              <span>项目地址</span>
              <p>{{item.program_url}}</p>
            </li>
            <li>
              <span>技&nbsp;&nbsp;术&nbsp;&nbsp;栈：</span> 
              <p>{{item.program_technology_stack.join(', ')}}</p>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
    <!--新增-->
    <alert 
      :alert.sync="alert"
      @close="closeAlert()">
      <div>
        <ul class="program-alert-wrap">
          <li>
            <div class="left">
              <span >项目名称：</span>
            </div>
            <div class="right mobile">
              <el-input v-model="currentProgramItem.program_name" clearable></el-input>
            </div>
          </li>
          <li>
            <div class="left">
              <span >项目内容：</span>
            </div>
            <div class="right mobile">
              <el-input v-model="currentProgramItem.program_content" clearable></el-input>
            </div>
          </li>
          <li>
            <div class="left">
              <span >项目地址：</span>
            </div>
            <div class="right mobile">
              <el-input v-model="currentProgramItem.program_url" clearable></el-input>
            </div>
          </li>
          <li>
            <div class="left">
              <span >技&nbsp;&nbsp;术&nbsp;&nbsp;栈：</span>
            </div>
            <el-tag
              :key="tag"
              v-for="tag in currentProgramItem.program_technology_stack"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ new stack</el-button>
          </li>
        </ul>
        <div class="program-alert-container-footer">
          <el-button @click="closeAlert()">取消</el-button>
          <el-button type="primary" @click="sure()" v-loading="loading">确 定</el-button>
        </div>
      </div>
    </alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      inputVisible: false,
      inputValue: '',
      alert: {
        title: '项目经历',
        footer: false, // 自定义是打开 div  ---> slot ---> footer
        width: 600, // 默认600px，为了响应式, max-width 为90% 非必传
        showalert: false
      },
      programList: [],
      currentProgramItem: {
        program_name: '',
        program_content: '',
        program_url: '',
        program_technology_stack: []
      }
    }
  },
  computed: {
  },
  methods: {
    handleClose(tag) {
      this.currentProgramItem.program_technology_stack.splice(this.currentProgramItem.program_technology_stack.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.currentProgramItem.program_technology_stack.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 关闭弹窗
    closeAlert() {
      this.alert.showalert = false
    },
    // 打开弹窗
    openAlert() {
      this.alert.showalert = true
    },
    getProgramList() {
      this.$http.get('api/programExperience').then(response => {
        this.programList = response.data
      })
    },
    resetCurrent() {
      this.currentProgramItem = {
        program_name: '',
        program_content: '',
        program_url: '',
        program_technology_stack: []
      }
    },
    addItem() {
      this.resetCurrent()
      this.openAlert()
    },
    changeItem(item) {
      console.log('change item', item)
      this.currentProgramItem = item
      this.openAlert()
    },
    deleteItem(item) {
      this.loading = true
      this.$http.delete(`api/programExperience/${item._id}`).then(() => {
        this.loading = false
        this.getProgramList()
      }).catch(err => {
        this.loading = false
        console.error(err)
      })
    },
    sure() {
      this.loading = true
      this.$http.post('api/programExperience', this.currentProgramItem).then(res => {
          this.loading = false
          this.closeAlert()
          this.resetCurrent()
          this.programList = res.data
        }).catch(err => {
          this.loading = false
          console.error(err)
        })    
    }
  },
  created() {
    this.getProgramList()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .program-alert-wrap {
    li {
      margin-bottom: 16px;
      .left {
        margin-bottom: 6px;
      }
    }
    .el-tag + .el-tag {
      margin-left: 10px;
      margin-bottom: 4px;
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
      vertical-align: bottom;
    }
  }
  .program-alert-container-footer {
    text-align: center;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.program-experience-wrap {
  &>div>div {
    position: relative;
    margin: 20px 20px 20px 0;
    display: inline-block;
    width: 48%;
    top: 0;
    transition: top .3s linear;
  }
  &>div>div:hover {
    top: -10px;
  }
  &>div>div:nth-of-type(2n) {
    margin-right: 0;
  }
  .box-card li {
    margin-bottom: 6px;
    p {
      font-size: 14px;
    }
  }
}
</style>



