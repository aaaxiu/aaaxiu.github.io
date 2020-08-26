# Element远程搜索Bug

> 公司开发一个项目用到了element-ui中的`Select`组件的远程搜索功能，出现了一个在反复搜索时会重置以前选中的项是它的label变成value的情况，这是一个不得不解决的bug，分享出我的解决办法供参考。

先看一下bug(下图)，在搜索到一些项选中后，再搜索其他的项选中的情况下，之前选中的会变成我绑定的`options`里的`value`。

![](https://user-gold-cdn.xitu.io/2019/11/11/16e5a9ed83f43065?w=301&h=261&f=png&s=11905)

首先我想到的会不会是我引用组件的方式不对，或者在选择器上绑定了change事件引发的，经过一系列的仔细排查后，我发现并不是我的方式有什么不对。然而当我复制这个组件在其他相似项目中使用的时候却发现并没有什么问题，这帮我定位到问题的根源---element-ui版本引发的bug。然后找到根源，解决起来也并不容易。

打开项目中的`package.json`文件，两个项目中的eleme版本好像没有不同-->`"element-ui": "^2.9.1"`。

不死心，打开`node_modules`中的源文件对比，发现果然不对，其实上面的版本指的是下载2.9.1以上的版本，我写这篇文档的时候已经是2.12.0了，而在2.9.1版本上确实没这样的问题。本来想切换到2.9.1了事，然鹅测试小姐姐说又有问题了（级联选择器在2.9.1上的bug），项目里用到级联选择器的地方比较多，毫不犹豫切换回新版本，还是想办法解决远程搜索的bug吧！

#### 解决方法

经过一番在element-ui的`issue`上的搜索后，发现指出这个bug的人不少，但真正有解决办法的并不多，最后找到一个比较靠谱的，思路就是把前一次选中的保留下来与搜索到的合并，靠谱！

但是照搬过来却不如人意，经过一番优化后代码如下：
```js
// 已选中项
const selectedOptions = this.brandOptions.filter(item => this.formModel.brand.includes(item.value))
if (query.trim() === '') {
    this.brandOptions = selectedOptions
    return
}
this.brandLoading = true
// 封装的AJAX方法
this.$httpAgent.GET({
    url: '/api/xxx.json',
    data: { brandName: query },
    success: (res) => {
        this.brandLoading = false
        // 新选项
        const brandOptions = res.data
        // 合并已选中项，解决element 2.12.0的问题
        // value组成的数组
        const brandOptionsValue = brandOptions.map(item => item.value)
        // 找出在brandOptions中不存在的selectedOptions的项
        const otherOptions = selectedOptions.filter(item1 => !(brandOptionsValue.some(item2 => item1.value === item2)))
        // 合并数组
        this.brandOptions = brandOptions.concat(otherOptions)
    }
})
```




<Vssue :title="$title" />
