<template>
  <div class="work-experience-wrap" v-loading="loading">
    <div>
      <el-button type="primary" @click="addItem()">新增</el-button>
    </div>
    <div>
      <div v-for="item in workList" :key="item._id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.enterprise_name}}</span>
            <el-button style="float: right; padding: 3px 6px;" type="primary" @click="changeItem(item)">修改</el-button>
            <el-button style="float: right; padding: 3px 6px;margin-right: 8px;" type="danger" @click="deleteItem(item)">删除</el-button>
          </div>
          <ul>
            <li>
              <span>起止日期：</span>
              <p>{{`${item.in_service[0]} - ${item.in_service[1]}`}}</p>
            </li>
            <li>
              <span>工作岗位：</span>
              <p>{{item.position}}</p>
            </li>
            <li>
              <span>工作内容：</span>
              <p>{{item.work_content}}</p>
            </li>
            <li>
              <span>技&nbsp;&nbsp;术&nbsp;&nbsp;栈：</span> 
              <p>{{item.work_technology_stack.join(', ')}}</p>
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
        <ul class="work-alert-wrap">
          <li>
            <div class="left">
              <span >企业名称：</span>
            </div>
            <div class="right mobile">
              <el-input v-model="currentWorkItem.enterprise_name" clearable></el-input>
            </div>
          </li>
          <li>
            <div class="left">
              <span >起止时间</span>
            </div>
            <div class="right mobile">
              <el-date-picker
                  v-model="currentWorkItem.in_service"
                  type="daterange"
                  range-separator="至"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </div>
          </li>
          <li>
            <div class="left">
              <span >工作岗位：</span>
            </div>
            <div class="right mobile">
              <el-input v-model="currentWorkItem.position" clearable></el-input>
            </div>
          </li>
          <li>
            <div class="left">
              <span >工作内容：</span>
            </div>
            <div class="right mobile">
              <el-input v-model="currentWorkItem.work_content" clearable></el-input>
            </div>
          </li>
          <li>
            <div class="left">
              <span >技&nbsp;&nbsp;术&nbsp;&nbsp;栈：</span>
            </div>
            <el-tag
              :key="tag"
              v-for="tag in currentWorkItem.work_technology_stack"
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
        <div class="work-alert-container-footer">
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
        title: '工作经历',
        footer: false, // 自定义是打开 div  ---> slot ---> footer
        width: 600, // 默认600px，为了响应式, max-width 为90% 非必传
        showalert: false
      },
      workList: [{
        enterprise_name: 'Onion Math',
        in_service: ['2019-07-01', '2021-04-28'],
        position: 'Front end Enginee',
        work_content: 'Onion Math App↵Onion Math Admin',
        work_technology_stack: [
          'React',
          'Redux',
          'Redux-Observable',
          'RXJS',
          'Mini Program'
        ],
        _id: '5d972b4217a37e63da121c0a'
      }],
      currentWorkItem: {}
    }
  },
  computed: {
  },
  methods: {
    handleClose(tag) {
      this.currentWorkItem.work_technology_stack.splice(this.currentWorkItem.work_technology_stack.indexOf(tag), 1)
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
        this.currentWorkItem.work_technology_stack.push(inputValue)
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
    getWrokList() {
      this.$http.get('api/workExperience').then(response => {
        this.workList = response.data
      })
    },
    resetCurrent() {
      this.currentWorkItem = {
        enterprise_name: '',
        in_service: [],
        position: '',
        work_content: '',
        work_technology_stack: []
      }
    },
    addItem() {
      this.resetCurrent()
      this.openAlert()
    },
    changeItem(item) {
      console.log('change item', item)
      this.currentWorkItem = item
      this.openAlert()
    },
    deleteItem(item) {
      this.loading = true
      this.$http.delete(`api/workExperience/${item._id}`).then(() => {
        this.loading = false
        this.getWrokList()
      }).catch(err => {
        this.loading = false
        console.error(err)
      })
    },
    sure() {
      this.loading = true
      this.$http.post('api/workExperience', this.currentWorkItem).then(res => {
          this.loading = false
          this.closeAlert()
          this.resetCurrent()
          this.workList = res.data
        }).catch(err => {
          this.loading = false
          console.error(err)
        })    
    }
  },
  created() {
    this.getWrokList()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .work-alert-wrap {
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
  .work-alert-container-footer {
    text-align: center;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.work-experience-wrap {
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



