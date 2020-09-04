# 林河前端之路

项目地址 [https://imlinhe.com](https://imlinhe.com)

### 项目启动和打包方式

1. `yarn` 下载相关模块，`yarn dev` 启动项目。

2. 有两个分支， `master` 存放的是生成的静态文件， `develop` 存放的是网站的原始文件，已修改默认分支为 `develop`。一般来说不需要去切换分支，只需要在 `develop` 上开发就好，完成之后暂存、提交和 push。

3. 生成静态文件只需要执行 `yarn deploy` 即可打包并发布到 github（无论你当前在哪个分支，它执行的是项目目录下的 deploy.sh 文件 ）。但是需要注意的是 `yarn deploy` 依赖于 GitBash，也就是说要在 git 的命令行中运行。

### 添加页面方式

> 所有的页面都在 docs/pages/ 下面，根据 tabs 区分不同的文件夹

~~1. 首先在对应 tabs 下创建 markdown 文件，如 blog/javascript 下的“前端实现图片压缩上传.md”~~

~~2. docs/.vuepress 是 vuepress 配置相关的文件夹，打开 docs/.vuepress/config.js 。在 `themeConfig.sidebar` 下添加配置。~~

  ``` js
  // !! 配置已修改，以下示例作废
  export default = {
    themeConfig: {
      // ...
      sidebar: {
        '/pages/blog/': [ // 注意前后都有斜线    
          {
            title: 'JavaScript',   // 一级菜单名称
            collapsable: false, // false为默认展开菜单, 默认值true是折叠,
            children: [
              ['javascript/前端实现图片压缩上传.md', '前端实现图片压缩上传']  // [跳转地址，侧边栏名称]
              // ...
            ]
          }
        ]
      }
    }
  }
```

**现在不需要这么做了，只需要符合 `pages/xxx/xxx/xxx.md` 这样的目录结构，直接创建 markdown 文件就能被加载在侧边栏和对应首页目录（指的是 `pages/xxx/README.md` 文件 ）中。它的原理是使用 `fs.readdirSync` 和 `require.context(...)` 等 API （详细配置可查看 [.vuepress/readdir.js](https://github.com/imlinhe/imlinhe.github.io/blob/develop/docs/.vuepress/readdir.js) 和 [pages/blog/README.md](https://github.com/imlinhe/imlinhe.github.io/blob/develop/docs/pages/blog/README.md)）。**

### 常用功能

1. 用标签引入图片方式，如果图片存在 docs/.vuepress/public 下（这个目录下都是静态文件）不能使用相对路径引入。

  ```
  <img :src="$withBase('/linhe.jpg')" alt="linhe">
  ```

2. 使用表情，全部表情在 [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

  :100:
  :grinning:
  :pout:
  :pray:
  :+1:
  :selfie:
  :man_teacher:
  :ok_woman:
  :couplekiss_man_woman:
  :mouse:
  :pig:
  :sun_with_face:
  :eggplant:

使用方式：使用冒号包裹需要添加的表情 :yourEmoji:。

3. vue 风格提醒

  ```
  ::: tip
  这是一个提示
  :::
  ```

  另外还有 warning 、danger 、 details 。

### 添加的 vuepress 相关插件

- "@vuepress/plugin-back-to-top": 返回顶部
- "@vuepress/plugin-google-analytics": 谷歌应用分析
- "@vuepress/plugin-medium-zoom": 图片缩放

相关配置查看 [config.js](https://github.com/imlinhe/imlinhe.github.io/blob/develop/docs/.vuepress/config.js#L13)

### 问题

1. 为什么 master 只有一次提交记录

> master 是dist目录下的文件，每次打包都会删除dist后重新打包，因此 .git 文件也一并删除了，所以总是只有一次提交记录。
