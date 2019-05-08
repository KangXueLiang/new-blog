<template>
  <div>
    <div class="container shop-management-container">
      <header>
        <el-form :inline="true" class="demo-form-inline" style="display: inline-block; vertical-align: middle">  
          <el-form-item>
            <el-input type="text" placeholder="标题" v-model="searchData.keywords" clearable style="width: 320px; margin-right: 10px;" @keyup.enter.native="search"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="searchData.status" placeholder="状态">
              <el-option v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">搜索</el-button>
            <el-button type="primary" @click="addArticle()">新增</el-button>
          </el-form-item>
        </el-form>
      </header>
      <main v-loading="loading">
        <el-table
          :data="articleList"
          :header-cell-style="headerStyle"
          highlight-current-row
          fit
          style="width: 100%">
          <el-table-column
            label="标题">
            <template slot-scope="scope">
              <span @click="goDetail(scope.row.id)" class="staff-jump-tip">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="summary"
            label="摘要">
          </el-table-column>
          <el-table-column
            min-width="100"
            label="封面图">
            <template slot-scope="scope">
              <img :src="scope.row.header_cover" style="width: 100%;">
            </template>
          </el-table-column>
          <el-table-column
            label="发布日期">
            <template slot-scope="scope">
              <span>{{scope.row.publish_date.substr(0, 10)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改日期">
            <template slot-scope="scope">
              <span>{{scope.row.last_modified_date.substr(0, 10)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已读次数">
            <template slot-scope="scope">
              <span>{{scope.row.pv_count}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发布状态">
            <template slot-scope="scope">
              <span :class="[ scope.row.status ? 'state-normal' : 'state-deprecated']">{{scope.row.status ? '已发布' : '草稿'}}</span>
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
      <article-detail :alert="alert" :article="currentArticle" @close="closeAlert" @submit="submitAlert()"></article-detail>
      <!-- 底部分页 -->
      <footer>
        <div class="common-pagination" v-if="total > 0">
          <pagination-base 
            :total="total"
            :pageSize="page_size"
            :currentPage="currentPage" 
            @currentChange="currentChange">
          </pagination-base>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import ArticleDetail from './ArticleDetail'
export default {
  components: {
    ArticleDetail
  },
  data() {
    return {
      loading: false,
      total: 0,
      page_size: 20,
      currentPage: 1,
      searchData: {
        keywords: '',
        status: 0
      },
      statusOptions: [ // 状态选项
        {
          value: 0,
          label: '--状态--'
        },
        {
          value: 1,
          label: '已发布'
        },
        {
          value: 2,
          label: '草稿'
        }
      ],
      articleList: [],
      alert: {
        title: '',
        footer: false, // 自定义是打开 div  ---> slot ---> footer
        width: 1000, // 默认600px，为了响应式, max-width 为90% 非必传
        showalert: false
      },
      currentArticle: ''
    }
  },
  methods: {
    // --------- 表头单元格的 style 回调方法, 也可使用固定的 Object 为所有表头单元格设置一样的 Style ----------
    headerStyle() {
      return { 'background-color': 'rgb(245, 248, 250)' }
    },
    // 搜索
    search() {
      this.currentPage = 1
      this.getList()
    },
    getList() {
      console.log('获取文章列表')
      this.$http.get('api/articles/list', {
        keywords: this.searchData.keywords,
        status: this.searchData.status,
        page: this.currentPage
      }).then(data => {
        this.articleList = data.data.list
        this.total = data.data.Amount
      })
    },
    addArticle() {
      this.currentArticle = null
      this.alert.title = '添加博客'
      this.openAlert()
    },
    goDetail(item) {
      console.log('查看文章')
      this.currentArticle = item
      this.alert.title = '修改博客'
      this.openAlert()
    },
    deleteItem(id) {
      this.$confirm('要确定删除此文章吗？', '删除文章', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http.post('api/articles/delete', {
          id
        }).then(() => {
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
    submitAlert() {
      // 重新获取列表
      this.getList()
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


