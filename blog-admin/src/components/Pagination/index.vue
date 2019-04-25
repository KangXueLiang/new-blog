<!--
 *
 * 用例说明：
 * pagination-base 全局注册，直接在 template 使用
 *
 * <template>
 *   <pagination-base 
 *     :total="total" 
       :pageSize="20"
 *     :currentPage="currentPage" 
 *     @currentChange="currentChange">
 *   </pagination-base>
 * </template>

 *
 * total：总数
 * pageSize：每页条数
 * currentPage：当前页码 default: 1
 *
 * 父组件里面：
 * ...
 * data() {
 *   return {
 *     total: 100,
 *     currentPage: 1
 *   }
 * },
 * methods: {
*   currentChange(val) {
 *     console.log('val', val)
 *   }
 * }
 * ...
-->
<template>
  <div>
    <el-pagination
      background
      :class="[{'bg-color-white': bgColor === '#fff'}, {'bg-color--grey': bgColor === '#E0E0E0'}]"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next, jumper"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PaginationBase',
  data() {
    return {}
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      required: true
    },
    bgColor: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 改变自带分页块颜色为白色加透明度 */
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev {
  background-color: rgba(255, 255, 255, 1)!important;
}
.bg-color-white.el-pagination.is-background {
  .el-pager {
    .number {
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
.bg-color--grey.el-pagination.is-background {
  .el-pager {
    .number {
      background-color: #E0E0E0;
    }
  }
}
</style>
