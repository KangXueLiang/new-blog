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
          min-width="100"
          label="封面图">
          <template slot-scope="scope">
            <img :src="scope.row.img_url" style="width: 100%;">
          </template>
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签">
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类">
        </el-table-column>
        <el-table-column
          label="发布状态">
          <template slot-scope="scope">
            <span :class="[ scope.row.status === 1 ? 'state-normal' : 'state-deprecated']">{{scope.row.status === 1 ? '已发布' : '草稿'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原创状态">
          <template slot-scope="scope">
            <span>{{scope.row.origin}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章类型">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创作时间">
          <template slot-scope="scope">
            <span>{{scope.row.update_time}}</span>
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
                <el-dropdown-item><div @click="goDetail(scope.row.id)" class="extend-x" v-has="['staff-action-shop-management-detail']">查看详情</div></el-dropdown-item>
                <el-dropdown-item><div @click="deprecatedItem(scope.row)" class="extend-x" v-has="['staff-action-shop-management-unused']">作废</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </main>
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
export default {
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
      articleList: []
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
    },
    addArticle() {
      console.log('新增博客')
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style>

</style>


