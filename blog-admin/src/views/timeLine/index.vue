<template>
  <div>
    <div class="container shop-management-container">
      <header>
        <el-form :inline="true" class="demo-form-inline" style="display: inline-block; vertical-align: middle">  
          <el-form-item>
            <el-button type="primary" @click="add()">新增</el-button>
          </el-form-item>
        </el-form>
      </header>
      <main v-loading="loading">
        <el-table
          :data="timeList"
          :header-cell-style="headerStyle"
          highlight-current-row
          fit
          style="width: 100%">
          <el-table-column
            label="标题">
            <template slot-scope="scope">
              <span @click="goDetail(scope.row)" class="staff-jump-tip">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="introduction"
            label="摘要">
          </el-table-column>
          <el-table-column
            min-width="100"
            label="封面图">
            <template slot-scope="scope">
              <img :src="scope.row.cover" style="width: 100%;">
            </template>
          </el-table-column>
          <el-table-column
            label="发生日期">
            <template slot-scope="scope">
              <span>{{scope.row.release_date.substr(0, 10)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-more" style="cursor: pointer; color: #0BB27A"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><div @click="goDetail(scope.row)" class="extend-x">查看</div></el-dropdown-item>
                  <el-dropdown-item><div @click="deleteItem(scope.row._id)" class="extend-x">删除</div></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </main>
      <!-- 弹窗 -->
      <time-detail :alert="alert" :time="currentTime" @close="closeAlert" @submit="submitAlert"></time-detail>
    </div>
  </div>
</template>
<script>
import TimeDetail from './TimeDetail'
export default {
  components: {
    TimeDetail
  },
  data() {
    return {
      loading: false,
      timeList: [],
      alert: {
        title: '',
        footer: false, // 自定义是打开 div  ---> slot ---> footer
        width: 1000, // 默认600px，为了响应式, max-width 为90% 非必传
        showalert: false
      },
      currentTime: ''
    }
  },
  methods: {
    // --------- 表头单元格的 style 回调方法, 也可使用固定的 Object 为所有表头单元格设置一样的 Style ----------
    headerStyle() {
      return { 'background-color': 'rgb(245, 248, 250)' }
    },
    getList() {
      this.$http.get('api/abouts').then(data => {
        this.timeList = data.data
      })
    },
    add() {
      this.currentTime = null
      this.alert.title = '添加时间轴'
      this.openAlert()
    },
    goDetail(item) {
      this.currentTime = item
      this.alert.title = '修改时间轴'
      this.openAlert()
    },
    deleteItem(id) {
      this.$confirm('要确定删除吗？', '删除时间轴', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http.delete(`api/abouts/${id}`).then(() => {
          this.$message.success('删除成功')
          this.getList()
        }).catch(e => {
          this.$message.error(e || '删除失败')
        })
      }).catch(() => {
        console.log('取消操作')         
      }) 
    },
    // 打开弹窗
    openAlert() {
      this.alert.showalert = true
    },
    // 关闭弹窗
    closeAlert() {
      this.alert.showalert = false
    },
    // 弹窗提交
    submitAlert(res) {
      // 重新获取列表
      this.timeList = res.data
      this.closeAlert()
    },
    // 分页
    currentChange(val) {
      this.currentPage = val
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style>

</style>


