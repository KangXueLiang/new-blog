<template>
  <div class="tt-form-item">
    <label class="tt-form-item__label">
      <slot name="label">{{label}}</slot>
    </label>
    <div class="tt-form-item__content">
      <template v-if="!link">
        {{value ? value : '--'}}
      </template>
      <template v-else>
        <a :href="value" target="blank" style="color: #0bb27a">{{value}}</a>
      </template> 
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      default: ''
    },
    link: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  .tt-form-item {
    width: 50%;
    margin-bottom: 8px;
    display: inline-block;
    vertical-align: top;
    .tt-form-item__label {
      font-size: 14px;
      text-align: right;
      float: left;
      font-size: 14px;
      color: #80848f;
      line-height: 40px;
      padding: 0 20px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      vertical-align: middle;
      font-weight: 700;
      width: 150px;
    }
    .tt-form-item__content {
      margin-left: 150px;
      width: 300px;
      font-size: 14px;
      line-height: 40px;
      position: relative;
      color: #495060;
      overflow-wrap: break-word;
      &>after {
        clear: both;
      }
    }
  }
</style>