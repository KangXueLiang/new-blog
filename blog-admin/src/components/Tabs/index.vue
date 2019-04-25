<!--商理事专用tab切换，只负责展示切换，内容由父组件提供-->
<template>
  <div class="sls-tab">
    <div class="tab-wrap">
      <div class="active-bar" ref="bar" :style="{width: barWidth+'px', transform: 'translateX(' + barTrans + 'px)'}">
      </div>
      <template v-for="(item, index) in lists">
        <div class="item" @click="selectItem(item.id, index)" ref="item" :key="index">
          <div class="item-inner">
            {{item.name}}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['lists', 'defaultTabIndex'],
    name: 'tab1',
    data() {
      return {
        selected: 0, // 当前选中项
        barWidth: 0, // 蓝条的宽度
        barTrans: 0 // 蓝条的位置
      }
    },
    methods: {
      // 选中项目，把id传出去
      selectItem(id, index) {
        this.selected = index
        const items = this.$refs.item
        // 设置蓝条的宽度
        this.barWidth = items[this.selected].offsetWidth
        // 设置蓝条的偏移
        let trans = 0
        for (let i = 0; i < index; i++) {
          trans += items[i].offsetWidth
        }
        this.barTrans = trans
        // 调整border, 当前选中项与前一项，最后一项没有border
        // 调整is-active类
        for (let j = 0; j < items.length; j++) {
          if (items[j].classList.contains('no-border')) {
            items[j].classList.remove('no-border')
          }
          if (items[j].classList.contains('is-active')) {
            items[j].classList.remove('is-active')
          }
        }
        if (index - 1 >= 0) {
          items[index - 1].classList.add('no-border')
        }
        items[index].classList.add('no-border')
        items[index].classList.add('is-active')
        this.$emit('select', id)
      }
    },
    mounted() {
      this.barWidth = this.$refs.item[0].offsetWidth
      this.$refs.item[0].classList.add('is-active')
      if (this.defaultTabIndex !== null || this.defaultTabIndex !== undefined) {
        this.lists.forEach((e, i) => {
          // console.log(e.id, '--', this.defaultTabIndex)
          if (e.id === Number(this.defaultTabIndex)) {
            this.selectItem(e.id, i)
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped="">
  .sls-tab {
    .tab-wrap {
      background-color: #eef0f1;
      position: relative;
    }
    .active-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;
      background-color: #0BB27A;
      z-index: 1;
      transition: transform .3s cubic-bezier(.645,.045,.355,1);
      list-style: none;
    }
    .item {
      cursor: pointer;
      display: inline-block;
      height: 50px;
      color: #353535;
      line-height: 50px;
      font-size: 14px;
      font-weight: 500;
      transition: all .3s cubic-bezier(.645,.045,.355,1)
    }
    .item:hover {
      color: #0BB27A;
    }
    .is-active {
      color: #0BB27A;
      background-color: #fff;
      .item-inner:after {
        display: none;
      }
    }
    .item-inner {
      position: relative;
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      padding: 0 20px;
    }
    .item-inner::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      height: 30px;
      background-color: #ddd;
    }
    .item:last-child .item-inner::after, .no-border .item-inner::after {
      display: none;
    }
  }
</style>
