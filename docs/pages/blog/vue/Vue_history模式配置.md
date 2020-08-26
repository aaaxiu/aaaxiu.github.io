# Vue_history模式配置

### 后台配置
后端使用的iis [官网教程](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

后台配置很简单, 直接按照官网教程安装[IIS UrlRewrite](https://www.iis.net/downloads/microsoft/url-rewrite), 然后再项目所在服务器路径根目录下放置web.config文件, 内容如下:
```js
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
          <match url="(.*)" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

需要注意的点就是如果项目不在服务器根路径还需要修改
```js
 <action type="Rewrite" url="/" />
```
为( 这里假设服务器的地址是/website/ )
```js
<action type="Rewrite" url="/website/" />
```


### 前端配置
相对来说前端的配置要复杂一些:
修改router/index.js为:
```js
export default new VueRouter({
    mode: 'history',  // 更漂亮的url地址
    base: /website/,
    routes: routes
})
```
routes 下面要通过设置path为*来匹配404页面, 这样通过域名或者ip访问一级路由已经没有问题了,但是在访问二级路由时刷新会出现白屏, 所以还需要配置:

1. 打包后静态资源的路径需要修改

修改config/index.js文件的build节点下的assetsPublicPath
```js
build: {
    ...
    assetsSubDirectory: 'static',
    assetsPublicPath: './'  // 未修改前的配置为 '/'，
}
```
直接设置相对路径对于hash模式行得通, 但是history模式就不行了, 我们需要设置它的绝对路径, 因为当子路由通过相对路径访问`./static/`访问不到路径, 因此要改为
```js
build: {
    ...
    assetsSubDirectory: 'static',
    assetsPublicPath: '/website/'  // 未修改前的配置为 '/'，
}
```

2. 路由文件需要修改

像上面这样直接设置`base: /website/`也是可行的, 但是在开发环境中也会带这个路径, 我们要修改config/dev.env.js
```js
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROUTER_BASE: '"/"'  // 添加
})
```
还有config/prod.env.js
```js
module.exports = {
  NODE_ENV: '"production"',
  ROUTER_BASE: '"/website/"'
}
```
最后可以修改路由设置了
```js
export default new VueRouter({
    mode: 'history',  // 更漂亮的url地址
    base: process.env.ROUTER_BASE, // 这是新加的配置
    routes: routes
})
```

### 尾声
这就是配置的全部内容了, 纯粹作为自己第一次配置花费了半天时间的一个记录, 可能描述的不够具体, 如果有碰到同样问题的朋友可以留言交流





<Vssue :title="$title" />
