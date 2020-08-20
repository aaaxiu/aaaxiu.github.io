# Canvas 签名

根组件：

```vue
<template lang="pug">
  //- orderNo 生成图片名称变量
  //- signUrl 图片地址
  SignatureAgree(
    :orderNo="orderNo"
    :signUrl.sync="signUrl"
  )
</template>
```

父组件：
```vue
<template lang="pug">
  .signature-agreement-container
    .signature-container(@click="signatureHandle")
      img(v-if="signUrl" :src="signUrl")
      p(v-else) 请仔细阅读并确认协议后进行签名
    drawContent(
      v-model="showDraw"
      v-show="showDraw"
      @confirm="confirmHandler"
      :img-data="signUrl"
    )
</template>

<script>
import drawContent from './draw-content'

export default {
  name      : 'SignatureAgreement',
  components: {
    drawContent
  },
  props: {
    signUrl: {
      type: String
    },
    orderNo: {
      type: String
    }
  },
  data() {
    return {
      showDraw: false
    }
  },
  methods: {
    // 签名
    signatureHandle() {
      this.showDraw = true
    },
    async confirmHandler(base64) {
      this.showDraw = false
      const params = {
        base64 : base64.split(',')[1],
        imgName: 'sign_' + this.orderNo
      }
      // 上传到 oss
      let {imgUrl: signUrl} = await this.$superAgent.saveInputStreamByOss(params)
      this.$emit('update:signUrl', signUrl)
    }
  }
}
</script>

<style scoped lang='less'>
.signature-agreement-container {
  background: @body-background;
  padding: 20/@base 30/@base;
  .signature-container {
    margin-top: 20/@base;
    border-radius: 8/@base;
    background-color: #fff;
    height: 270/@base;
    img {
      width: 100%;
    }
    p {
      line-height: 270/@base;
      text-align: center;
    }
  }
  .submit-container {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 184/@base;
    background:linear-gradient(180deg,#FCFCFC 0%,@body-background 100%);
    padding: 48/@base 30/@base;
    button {
      width: 100%;
      font-size: 32/@base;
      color: #fff;
      line-height: 88/@base;
      border: none;
      border-radius: 44/@base;
      background: @primary-color;
    }
  }
}
</style>

</style>
```

子组件：

```vue
<template lang="pug">
  .draw-content
    .sign-canvas(id='canvasBox')
      .sign-canvas-content
        .canvas-top(id='top')
          .canvas-button-left
            button.button-rotate.font-size-32.cancel(@click='canvasShow') 取消
          .canvas-button-right
            button.button-rotate.font-size-32.submit(@click='confirm',:class='{primary:lastX !== -1}') 确认
            button.button-rotate.font-size-32(@click='reset') 重置
        .canvas-box
          canvas(ref="sign" @touchmove="onTouchMove" @touchstart="onTouchStart" @touchend="onTouchEnd")
          canvas(ref="rotate" v-show="false")
</template>

<script>
  export default {
    name : 'DrawContent',
    props: [ 'value', 'imgData' ],
    data() {
      return {
        lastX     : -1,
        lastY     : -1,
        ctx       : {},
        offsetTop : 0,
        offsetLeft: 0,
        canvas    : {},
        signShow  : true,
        img       : '',
        isInit    : false
      }
    },
    watch: {
      value(val) {
        if (val && !this.isInit) {
          this.isInit = true
          this.$nextTick(() => {
            this.initDraw()
          })
        }
        this.$nextTick(() => {
          if (val) {
            document.addEventListener('touchmove', this.preventDefault, true)// 禁用滚动
          } else {
            document.removeEventListener('touchmove', this.preventDefault, true)// 滚动
          }
        })
      }
    },
    methods: {
      preventDefault(e) {
        e.preventDefault()
      },
      canvasShow() { // 签名开启关闭
        this.reset()
        let show = !this.value
        this.$emit('input', show)
      },
      onTouchMove(e) {
        this.drawLine(e.changedTouches[0])
        this.lastX = e.changedTouches[0].pageX
        this.lastY = e.changedTouches[0].pageY
        e.stopPropagation()
      },
      onTouchStart(e) {
        this.lastX = e.changedTouches[0].pageX
        this.lastY = e.changedTouches[0].pageY
      },
      onTouchEnd(e) {
        this.drawLine(e.changedTouches[0])
      },
      drawLine(touches) {
        this.ctx.beginPath()
        this.ctx.lineWidth = 10
        this.ctx.lineCap = 'round'
        this.ctx.strokeStyle = '#1ab499'
        this.ctx.lineTo(this.lastX - this.offsetLeft, this.lastY - this.offsetTop)// 不画线
        this.ctx.lineTo(touches.pageX - this.offsetLeft, touches.pageY - this.offsetTop)// 画线
        this.ctx.stroke()
      },
      reset() {
        this.lastX = -1// 清空初始化
        this.lastY = -1
        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      },
      confirm() {
        if (this.lastX === -1) { // 当没有签名的时候确认按钮不可用
          return
        }
        let img = new Image()
        img.src = this.canvas.toDataURL('image/png')
        img.onload = () => {
          let height = img.height
          let width = img.width
          let canvas = this.$refs.rotate
          let ctx = canvas.getContext('2d')
          canvas.width = height
          canvas.height = width
          ctx.rotate(1 * 90 * Math.PI / 180)
          ctx.drawImage(img, 0, -height)
          let base = canvas.toDataURL('image/png')
          this.$emit('confirm', base)
        }
      },
      initDraw() {
        this.canvas = this.$refs.sign
        this.offsetTop = this.canvas.parentElement.offsetTop
        this.offsetLeft = this.canvas.parentElement.offsetLeft
        this.canvas.setAttribute('width', this.canvas.parentElement.clientWidth)// 内部像素和css像素不一致 所以要这么写
        this.canvas.setAttribute('height', this.canvas.parentElement.clientHeight)
        this.ctx = this.canvas.getContext('2d')
        // 背景色 背景填充
        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.signShow = false
      }
    }
  }
</script>

<style lang="less" rel='stylesheet/less'>
  @base-color: #21C9AD;
  .draw-content{
    .sign-canvas{
      position: fixed;
      padding: @global-padding;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 9999;
      background-color: #f8f8f8;
      .sign-canvas-content{
        width: 100%;
        display: flex;
        flex: 1;
        height: 100%;
        .canvas-top{
          height: 100%;
          width: 15%;
          display: flex;
          flex-direction: column-reverse;
          flex: 1;
          align-items: center;
          justify-content: space-between;
          margin-right: @global-padding;
          .canvas-button-left {
            transform: rotate(-90deg) translateX(50/@base);
          }
          .canvas-button-right {
            display: flex;
            flex-direction: row-reverse;
            transform: rotate(-90deg) translateX(-150/@base);
          }
          .button-rotate{
            height: 88/@base;
            width: 176/@base;
            color: #fff;
            background-color: @base-color;
            border-radius: 45/@base;
            border: none;
            &.cancel {
              background-color: transparent;
              color: @base-color;
              border: 2/@base solid @base-color;
            }
            &.submit {
              margin-left: @global-padding;
            }
          }
        }
        .canvas-box{
          height: 100%;
          width: 85%;
          background-color: #fff;
        }
      }
    }
  }
</style>
```
