<template>
  <div class="container shop-management-container">
    <el-button type="primary" @click="addItem()" style="margin-bottom: 32px;">新增歌曲</el-button>
    <main>
      <el-table
        :data="list"
        :header-cell-style="headerStyle"
        highlight-current-row
        fit
        style="width: 100%">
        <el-table-column
          label="歌曲封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover" style="width: 100%;">
          </template>
        </el-table-column>
        <el-table-column
          label="歌曲名称">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="歌手">
          <template slot-scope="scope">
            <span>{{scope.row.artist}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="歌曲链接">
          <template slot-scope="scope">
            <a :href="scope.row.music_file_url" target="_blank" style="color: #0BB27A;">{{scope.row.music_file_url}}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="歌曲顺序">
          <template slot-scope="scope">
            <span>{{scope.row.order}}</span>
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
    <add-music :alert="alert" :music="currentItem" @close="closeAlert" @submit="submitAlert"></add-music>
  </div>
</template>
<script>
import AddMusic from './AddMusic'
export default {
  components: {
    AddMusic
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
      this.$http.get('api/litePlayers').then(res => {
        this.list = res.data
      }).catch(e => {
        this.$message.error(e || '获取失败')
      })
    },
    // 删除
    deleteItem(id) {
      this.$confirm('要确定删除此歌曲吗？', '删除歌曲', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http.delete(`api/players/${id}`).then(res => {
          this.$message.success('删除成功')
          this.list = res.data
        }).catch(e => {
          this.$message.error(e || '删除失败')
        })
      }).catch(() => {
        console.log('取消操作')         
      })  
    },
    // 新增分类
    addItem() {
      this.alert.title = '添加歌曲'
      this.currentItem = ''
      this.openAlert()
    },
    editItem(item) {
      this.alert.title = '编辑歌曲'
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
    submitAlert(list) {
      // 重新获取列表
      this.list = list
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


