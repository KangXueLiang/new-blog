<template>
  <div class="drawer" :class="wrapperClass" :style="{ width: drawerWidth }">
    <slot></slot>
    <div class="drawer__operation" @click="close">
      <div v-if="showClose" class="tr-drawer__operation-close">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIHN0cm9rZT0iIzk3OTc5NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICA8ZyBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgIDxwYXRoIGQ9Ik0xIDFsMTIgMTJNMTMgMUwxIDEzIj48L3BhdGg+CiAgPC9nPgo8L3N2Zz4K"
          alt
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Drawer",
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "right"
    },
    width: [String, Number],
    autoHide: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ""
    },
    beforeClose: {
      type: Function,
      default: function(callback) {
        callback();
      }
    }
  },
  model: {
    prop: "collapse",
    event: "change"
  },
  data() {
    return {
      collapsed: this.collapse
    };
  },
  watch: {
    collapse: {
      handler(val, oldVal) {
        // console.log('collapsed', val, oldVal);
        let that = this;
        if (!val && oldVal) {
          // open
          // => add mask
          let mask = document.createElement("div");
          mask.className = "drawer-mask";

          // if autoHide
          if (this.autoHide) {
            mask.onclick = function() {
              that.close();
            };
          }

          document.body.appendChild(mask);
        } else if (val && !oldVal) {
          // close
          // => remove mask
          let masks = document.getElementsByClassName("drawer-mask");
          for (let mask of masks) {
            document.body.removeChild(mask);
          }
        }
      },
      deep: true
    }
  },
  computed: {
    wrapperClass() {
      let wrapperClass = ""
      wrapperClass += `drawer--${this.position}`

      let collapsedClass = ""
      if (this.collapse) {
        collapsedClass = " drawer--collapsed"
      } else {
        this.$emit("open")
      }

      wrapperClass += collapsedClass;

      //custom class
      wrapperClass += " " + this.customClass;
      return wrapperClass;
    },
    drawerWidth() {
      let result = ""
      if (typeof this.width === "number") {
        result = this.width + "px"
      } else if (typeof this.width === "string") {
        result = this.width;
      } else {
        result = "600px"
      }
      return result;
    }
  },
  methods: {
    _reactOnMask() {
      let val = this.collapsed
      let that = this
      if (!val) {
        // open
        // => add mask
        let mask = document.createElement("div")
        mask.className = "drawer-mask"

        // if autoHide
        if (this.autoHide) {
          mask.onclick = function() {
            that.close()
          }
        }
        document.body.appendChild(mask)
      } else if (val) {
        // close
        // => remove mask
        let masks = document.getElementsByClassName("drawer-mask")
        for (let mask of masks) {
          document.body.removeChild(mask);
        }
      }
    },
    close() {
      this.beforeClose(this._close)
    },
    _close() {
      this.$emit("close")
      this.$emit("change", true)
    }
  },
  created() {
    this._reactOnMask()
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.drawer {
  position: fixed;
  z-index: 1003;
  padding: 20px;
  box-sizing: border-box;

  background-color: #fff;
  box-shadow: -5px 0 40px 0.5px rgba(0, 0, 0, 0.2);
  opacity: 1;
  transition: 0.3s ease-out;

  &--collapsed {
    opacity: 0;
    width: 0 !important;
    transition: 0.1s ease-out;
  }

  &--right {
    right: 0;
    top: 0;
    bottom: 0;

    .drawer__operation {
      position: absolute;
      right: 10px;
      top: 10px;
      img {
        box-sizing: content-box;
        width: 18px;
        transition: 0.3s ease-out;
        color: #979797;
        background-color: #fff;
        padding: 10px;
        border-radius: 50%;
        &:hover {
          cursor: pointer;
          transition: 0.3s ease-out;
          background-color: #f1f1f1;
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.drawer-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,.63);
  z-index: 1002;
}
</style>
