<template>
  <div class="container shop-management-container">
    <header>
      <el-form :inline="true" class="demo-form-inline" style="display: inline-block; vertical-align: middle">  
          <el-form-item>
            <el-input type="text" placeholder="标签名" v-model="keywords" clearable style="width: 320px; margin-right: 10px;" @keyup.enter.native="search"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">搜索</el-button>
            <el-button type="primary" @click="addCategory()">新增</el-button>
          </el-form-item>
        </el-form>
    </header>
    <main>
      <el-table
        :data="categoryList"
        :header-cell-style="headerStyle"
        highlight-current-row
        fit
        style="width: 100%">
        <el-table-column
          label="分类名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
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
            <!-- <span style="cursor: pointer; color: #0BB27A"  class="extend-x">修改</span> -->
            <el-button type="primary" size="mini" @click="editCategory(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row._id)">删除</el-button>
            <!-- <span style="cursor: pointer; color: #0BB27A"  @click="deleteItem(scope.row._id)" class="extend-x">删除</span> -->
          </template>
        </el-table-column>
      </el-table>
    </main>
    <!-- 弹窗 -->
    <add-category :alert="alert" :category="currentCategory" @close="closeAlert" @submit="submitAlert()"></add-category>
  </div>
</template>
<script>
import AddCategory from './components/AddCategory'
export default {
  components: {
    AddCategory
  },
  data() {
    return {
      loading: false,
      keywords: '',
      categoryList: [],
      alert: {
        title: '新增标签',
        footer: false, // 自定义是打开 div  ---> slot ---> footer
        width: 600, // 默认600px，为了响应式, max-width 为90% 非必传
        showalert: false
      },
      currentCategory: ''
    }
  },
  methods: {
    // --------- 表头单元格的 style 回调方法, 也可使用固定的 Object 为所有表头单元格设置一样的 Style ----------
    headerStyle() {
      return { 'background-color': 'rgb(245, 248, 250)' }
    },
    // 获取列表
    getList() {
      this.$http.get('api/category/list', {
        keywords: this.keywords
      }).then(res => {
        this.categoryList = res.data
      })
    },
    // 删除分类
    deleteItem(id) {
      this.$confirm('要确定删除此分类吗？', '删除分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http.post('api/category/delete', {
          id
        }).then(res => {
          this.$message.success('删除成功')
          this.getList()
        })
      }) 
    },
    // 新增分类
    addCategory() {
      this.alert.title = '添加分类'
      this.currentCategory = ''
      this.openAlert()
    },
    editCategory(item) {
      this.alert.title = '编辑分类'
      this.currentCategory = item
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


