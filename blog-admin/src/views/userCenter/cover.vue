<template>
  <div class="container shop-management-container">
    <header>
      <el-form :inline="true" class="demo-form-inline" style="display: inline-block; vertical-align: middle">  
        <el-form-item>
          <el-button type="primary" @click="addMotto()">新增Cover</el-button>
        </el-form-item>
      </el-form>
    </header>
    <main>
      <el-table
        :data="list"
        :header-cell-style="headerStyle"
        highlight-current-row
        fit
        border
        style="width: 100%">
        <el-table-column
          label="图片名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="图片展示">
          <template slot-scope="scope">
            <img :src="scope.row.url" style="width: 100%;">
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期">
          <template slot-scope="scope">
            <span>{{scope.row.upload_date.substr(0, 10)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteItem(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      loading: false,
      list: []
    }
  },
  methods: {
    // --------- 表头单元格的 style 回调方法, 也可使用固定的 Object 为所有表头单元格设置一样的 Style ----------
    headerStyle() {
      return { 'background-color': 'rgb(245, 248, 250)' }
    },
    // 获取列表
    getList() {
      this.$http.get('api/covers').then(res => {
        this.list = res.data
      }).catch(e => {
        this.$message.error(e || '获取失败')
      })
    },
    // 新增cover
    addMotto() {
      this.$prompt('请输入新的cover地址，格式：图片名称__图片地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let [name, url] = value.split('__')
        this.$http.post('api/covers', {
          name,
          url
        }).then((res) => {
          this.$message.success('新建成功')
          this.list = res.data
        })    
      })
    },
    // 删除
    deleteItem(id) {
      this.$confirm('要确定删除此cover吗？', '删除分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http.delete(`api/covers/${id}`, {
          id
        }).then((res) => {
          this.$message.success('删除成功')
          this.list = res.data
        }).catch(e => {
          this.$message.error(e || '删除失败')
        })
      }).catch(() => {
        console.log('取消操作')         
      })  
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="sass" scoped>

</style>
