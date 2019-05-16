<template>
  <div class="container shop-management-container">
    <el-button type="primary" @click="addItem()" style="margin-bottom: 32px;">新增友链</el-button>
    <main>
      <el-table
        :data="list"
        :header-cell-style="headerStyle"
        highlight-current-row
        fit
        style="width: 100%">
        <el-table-column
          label="友链名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="友链地址">
          <template slot-scope="scope">
            <a :href="scope.row.link" target="_blank" style="color: #0BB27A;">{{scope.row.link}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="描述">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期">
          <template slot-scope="scope">
            <span>{{scope.row.publish_date.substr(0, 10)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editItem(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <!-- 弹窗 -->
    <add-link :alert="alert" :friendLink="currentItem" @close="closeAlert" @submit="submitAlert()"></add-link>
  </div>
</template>
<script>
import AddLink from './components/AddLink'
export default {
  components: {
    AddLink
  },
  data() {
    return {
      loading: false,
      list: [],
      alert: {
        title: '',
        footer: false, // 自定义是打开 div  ---> slot ---> footer
        width: 600, // 默认600px，为了响应式, max-width 为90% 非必传
        showalert: false
      },
      currentItem: ''
    }
  },
  methods: {
    // --------- 表头单元格的 style 回调方法, 也可使用固定的 Object 为所有表头单元格设置一样的 Style ----------
    headerStyle() {
      return { 'background-color': 'rgb(245, 248, 250)' }
    },
    // 获取列表
    getList() {
      this.$http.get('api/friendLink/list', {
        keywords: this.keywords
      }).then(res => {
        this.list = res.data
      }).catch(e => {
        this.$message.error(e || '获取失败')
      })
    },
    // 删除分类
    deleteItem(id) {
      this.$confirm('要确定删除此友链吗？', '删除分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http.post('api/friendLink/delete', {
          id
        }).then(res => {
          this.$message.success('删除成功')
          this.getList()
        }).catch(e => {
          this.$message.error(e || '删除失败')
        })
      }).catch(() => {
        console.log('取消操作')         
      })  
    },
    // 新增分类
    addItem() {
      this.alert.title = '添加友链'
      this.currentItem = ''
      this.openAlert()
    },
    editItem(item) {
      this.alert.title = '编辑友链'
      this.currentItem = item
      this.openAlert()
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
    submitAlert() {
      // 重新获取列表
      this.getList()
      this.closeAlert()
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style>

</style>


