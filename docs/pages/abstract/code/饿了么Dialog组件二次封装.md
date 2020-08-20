# 饿了么Dialog组件二次封装

feature：支持拖动，可在组件上使用饿了么的属性和事件

使用方式：

```vue
<template>
  <div id="app">
    <el-button type="text" @click="handleOpen">点击打开 Dialog</el-button>

    <lin-dialog 
      :visible.sync="visibleDialog" 
      title="测试弹框"
      @confirm="$_handleConfirm" 
      @cancel="$_handleCancel">
      这是一段内容
    </lin-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibleDialog: false
    }
  },
  methods: {
    $_handleConfirm() {},
    $_handleCancel() {},
    handleOpen() {
      this.visibleDialog = true
    }
  }
}
</script>
```

封装：

```vue
<template>
  <el-dialog 
    v-drag
    :visible.sync="visibleDialog" 
    v-bind="$attrs" 
    ref="dialog__wrapper"
    v-on="$listeners">
    <!--内容区域的默认插槽-->
    <slot></slot>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("update:visible")
      }
    }
  },
  directives: {
    drag: {
      bind(el) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = this.$refs.dialog__wrapper
        dialogHeaderEl.style.cursor = 'move'
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop
          // 获取到的值带px 正则匹配替换
          let styL, styT
          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (sty.left.includes('%')) {
            styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
          } else {
            styL = +sty.left.replace(/\px/g, '')
            styT = +sty.top.replace(/\px/g, '')
          }
          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离 
            const l = e.clientX - disX
            const t = e.clientY - disY
            // 移动当前元素  
            dragDom.style.left = `${l + styL}px`
            dragDom.style.top = `${t + styT}px`
            //将此时的位置传出去
            //binding.value({x:e.pageX,y:e.pageY})
          }
          document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel")
    },
    handleConfirm() {
      this.$emit("confirm")
    }
  }
}
</script>
```




<Vssue :title="$title" />
