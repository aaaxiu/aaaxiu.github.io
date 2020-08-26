# Vue实战项目总结

> 一部分内容是很久以前就存在的（2017）,可能比较浅显:rofl:，不过胜在都是自己的经历，同时慢慢在总结更新。:100:

#### 基本内容
1. 异步加载路由方式:

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import('@/pages/home/Home')

export default new Router({
    scrollBehavior (to, from, savePosition) {
        return {x: 0, y: 0}  // 解决切换路由时页面不回到顶部的问题
    },
    router: [
        { path: '/home', name: 'Home', component: home},
    ]
})
```

2. 监听路由:

```js
watch: {
    $route (to, from, next) {
        console.log( to, from, next )
    }
}

```
3. 自定义404页面

```js
export default new Router({
    routes: [
        { path: '*', name: 'NotFound', component: notfound },  // 404
    ]
})
```

#### axios

1. 请求拦截:

axios/index.js
```js
import router from '@/router'  // 根据路由判断是否带token
import axios from 'axios'

axios.defaults.baseURL = 'http://xxx/api/'

axios.interceptors.request.use(config => {  // 请求拦截
  const token = sessionStorage.getItem('token')
  if( token && router.history.current.path.indexOf('login') === -1 ) {  // 登录页不带token
    config.headers.Authorization = `baseauth ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

export default axios
```

2. IE不能识别axios的Promise语法和某些ES6语法, 需要添加babel-polyfill插件：`yarn add babel-polyfill`

在main.js的**最顶部**引入: 

```js
import 'babel-polyfill'
```

修改webpack配置, webpack.base.conf.js

```js
module.exports = {
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    ...
}
```

#### favicon.ico

添加ico图标:

webpack.dev.conf.js

```js
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  inject: true,
+  favicon: path.resolve('favicon.ico')  // 添加.ico图标
})
```

webpack.prod.conf.js
```js
new HtmlWebpackPlugin({
  filename: config.build.index,
  template: 'index.html',
  inject: true,
  favicon: path.resolve('favicon.ico'), //新增
  ...
}
```

#### 行内添加图片

有时候我们需要添加本地的图片, 又想把图片路径设置成变量以便提取成公共组件:

```html
<template>
  <div class="base-title" :style="{background: 'url('+ backgroundUrl +') no-repeat center/cover'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BaseTitle',
  props: ['backgroundUrl']
}
</script>
```

```js
<BaseTitle :backgroundUrl="backgroundUrl"></BaseTitle>

export default {
    data () {
        return {
            backgroundUrl: require('@/assets/images/linhe.jpg')
        }
    }
}
```

#### yarn build

生产目录不一定是放在服务器的根目录, 所以需要修改config/index.js
```js
build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',  修改项目相对路径
    assetsPublicPath: './'
    ...
}
```

#### vue-quill-editor & quill-image-extend-module

VueQuillEditor.vue

```html js
<template>
  <div class="vue-quill-editor">
    <quill-editor 
      :content="editorContent"
      :options="editorOption"
      @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor, Quill} from 'vue-quill-editor'
// img upload plugin
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
    name: 'VueQuillEditor',
    data () {
        return {
            editorOption: {  // 富文本框参数设置
                modules: {
                    ImageExtend: {
                        
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                            'image': function () {
                                QuillWatch.emit(this.quill.id)
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        quillEditor
    }
}
```

#### vue-loader

有时候需要在父组件中定义子组件的样式, 又不想写在全局或者去掉scoped属性, 可以使用vue-loader的新特性(穿透) >>>, 在scss中不能使用 >>>, 可用 /deep/ 代替

```css
.news-cotent {
    /deep/ img {
        ...
    }
}
```

### vue中调用防抖或者节流

一般的，定义方法就这样

``` js
methods: {
    handleRun() {
        // ...
    }
}
```

那么，如果这个方法要加防抖必须这样：

``` js
import {debounce} from '@/utils.js'

export default {
    methods: {
        handleRun: debounce(function () {
            // ...
        })
    }
}
```

更新中。。。





<Vssue :title="$title" />
