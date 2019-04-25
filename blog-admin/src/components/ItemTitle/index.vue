<template>
  <div class="title-container"> 
    <div class="verticle"></div>
    <div class="title">
      <span>{{title}}</span>
    </div>
    <div class="hr"></div>
    <!-- 编辑和添加只能同时存在一个 -->
    <div class="edit" v-if="canEdit" @click="edit">
      <i class="el-icon-edit-outline"></i>
      <span>{{ editText }}</span>
    </div>
    <div class="edit" v-if="canAdd" @click="add">
      <i class="el-icon-circle-plus-outline"></i>
      <span>{{ addText }}</span>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  props: {
    title: { // 标题
      type: String,
      required: true
    },
    canEdit: { // 是否可以编辑 M
      type: Boolean,
      default: false
    },
    canAdd: { // 是否可以添加 M
      type: Boolean,
      default: false
    },
    editText:{
      type: String,
      default: '编辑'
    },
    addText: {
      type: String,
      default: '添加'
    }
  },
  mounted () {
  },
  methods: {
    edit() {
      this.$emit('edit')
    },
    add() {
      this.$emit('add')
    }
  },
  computed: {
  },
  components: {
  },
  watch: {
  }
}
</script>
<style lang="scss">
  .title-container {
    margin: 32px auto;
    height: 40px;
    line-height: 40px;
    position: relative;
    background: #fff;
    // padding: 16px 0;
    &>div {
      display: inline-block;
    }
    .verticle {
      position: absolute;
      left: 0;
      height: 20px;
      margin-top: 10px;
      width: 3px;
      background-color: #0BB27A;
    }
    .title {
      position: absolute;
      background-color: #fff;
      left: 3px;
      vertical-align: top;
      padding: 0 12px;
      color: #1c2438;
      font-size: 14px;
    }
    .hr {
      height: 1px;
      vertical-align: middle;
      background-color: #E8E8F3;
      width: 100%;
    }
    .edit {
      position: absolute;
      right: 0px;
      padding-right: 8px;
      background-color: #fff;
      color: #0BB27A;
      font-size: 14px;
      cursor: pointer;
      i {
        display: inline-block;
        padding: 0 12px;
      }
    }
  }
</style>


