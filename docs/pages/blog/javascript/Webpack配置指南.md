# Webpack配置指南

::: tip
本文根据《Webpack 实战：入门、进阶与调优》整理。限于篇幅，部分内容可能难以理解，建议直接阅读书籍并对比示例。
:::

## webpack简介

> 要用 webpack 首先得知道为什么要用它，webpack 的最大优势就是可以实现模块化。然而，JS 为什么要模块化呢？
> 这是因为传统的 JS 开发：污染全局作用域、需要手动维护 JS 的加载顺序、每个 script 标签都意味着需要向服务器发起一次静态请求。
> 而模块化可以很好解决上述问题：模块之间的作用域是相互隔离的、通过导入和导出语句可以很清晰的看到模块间的依赖关系、模块可以借助工具打包从而实现资源合并。


前端在很早以前就出现了模块化的思想。到 2015 年，ES6 正式定义了 JS 的模块标准。但是大多数的 npm 模块还是 CommonJS 的形式，浏览器并不支持。模块打包工具的任务就是解决模块间的依赖，使其打包后的结果能运行在浏览器上。

这里要说到 Webpack 相对于其他打包工具的优势，如 Parcel、Rollup 等。

- Webpack 默认支持多种模块标准，包括 AMD、CommonJS 以及 ES6 模块。
- Webpack 有完备的代码分割解决方案。
- Webpack 可以处理各种类型的资源。除了 JS 以外，还能处理样式、模板，图片等。
- Webpack 有强大的社区支持。

**进入正题：**

<!-- 我的代码同步在[github](https://github.com/imlinhe/Webpack_Config)上，可对比查看。 -->

#### 安装

Webpack 可运行在绝大部分的操作系统，它的唯一依赖是 Node。有一点需要注意的是，Node 推荐全局安装，Webpack 推荐本地安装，即安装在项目内。这样可保证项目在多人协作时 Webpack 版本一致。而且，部分依赖于 Webpack 的插件会调用项目中的 Webpack 的内部模块，这种情况下仍然需要在项目本地安装 Webpack。

首先新建一个工程目录，使用 `yarn init` 进行项目初始化。接下来执行安装 Webpack 的命令：

``` 
yarn add webpack webpack-cli -D
```

这里的 webpack 是核心模块，webpack-cli 是命令行工具。安装完成后执行 `npx webpack -v` 和` npx webpack-cli -v` 查看各自版本。注意，在本地安装的 webpack 无法直接使用 webpack 命令，需要加上 npx。

**打包第一个应用：**

首先在工程目录下添加一下几个文件。

index.js
```js
import addContent from './add-content.js'

document.write('My first Webpack app.<br />')

addContent()
```

add-content.js
```js
export default function() {
  document.write('Hello World!')
}
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My first Webpack app.</title>
</head>
<body>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

然后在控制台运行：
```
npx webpack --entry=./index.js --output-filename=bundle.js --mode=development
```

用浏览器打开 index.html 即可看到打包后的结果。

#### 使用npm scripts

使用 npm scripts 可以使命令行指令更加简洁，不必每次输入一长串的指令。具体在 package.json 里面添加：
```json
{
  "scripts": {
    "build": "webpack --entry=./index.js --output-filename=bundle.js --mode=development"
  }
}
```

注意，这里可以直接使用模块所添加的指令了，用 `webpack` 取代了 `npx webpack` 。随意修改文件后，这次执行 `yarn build` 同样可以打包成功。

#### 使用配置文件

Webpack 的默认配置文件是 webpack.config.js，添加配置文件并加入如下代码：
```js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  mode: 'development'
}
```

修改package.json的脚本为 `"build":"webpack"`，再次对内容进行修改并打包，可以发现配置文件生效了。

#### webpack-dev-server

每次修改完文件后都要重新进行打包并手动刷新网页当然是不能接受的。幸好 Webpack 社区为我们提供了一个便捷的本地开发工具 webpack-dev-server。首先进行安装：
```
yarn add webpack-dev-server -D
```

为了方便使用，同样在 npm 的脚本文件中添加指令：
```json
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server"
}
```

最后，在 webpack.config.js 中配置 webpack-dev-server：

```js
module.exports = {
  // ...
  devServer: {
    publicPath: '/dist'
  }
}
```

配置完成后，打开 `localhost:8080` 查看使用 webpack-dev-server 的结果。这里有一点需要注意，直接使用 Webpack 开发和使用 webpack-dev-server 有一个很大的区别，前者每次都会生成 bundle.js，而 webpack-dev-server 只是将打包结果放在内存中，并不会写入实际的 bundle.js，在每次 webpack-dev-server 接收到请求时都只是将内存中的打包结果返回给浏览器。webpack-dev-server 还有一项很便捷的特性就是 live-reloading（自动刷新），它在修改源文件时会自动刷新页面同步更新。

## 模块打包标准

#### CommonJS

CommonJS 在 09 年提出，而后 Node 实现了 CommonJS 标准的一部分，现在说 CommonJS 一般指的是 Node 中的标准。CommonJS 最初只为服务端而设计，直到有了 Browserify——一个运行在 Node.js 环境下的模块打包工具，它可以将 CommonJS 模块打包为浏览器可以运行的单个文件。从此，客户端也可以使用 CommonJS 标准。

前面已经说过，模块化的一大好处是模块之间的作用域互不影响，不会污染全局作用域。

CommonJS 通过 module.exports 导出模块内容，模块内部有一个 module 对象用于存放当前模块的信息。为了书写方便，CommonJS 也支持 export 导出内容。export 和 module.exports 不能混用。

在 CommonJS 中使用 require 进行模块导入，并且多次导入同一模块只会执行一次，因为导出的模块对象 module 有一个 loaded 属性用来记录该模块是否被加载过，默认是 false。

#### ES6 Module

ES6 Module 的导出方式为 export default（默认导出）和 export（命名导出），在使用命名导出时，可以使用 as 关键字对变量重命名。

导入为 import。而且 ES6 Module 会自动采用严格模式，也就是说等于默认在模块头部添加了“use strict”。

#### CommonJS与ES6 Module的区别

动态与静态：CommonJS 对模块依赖的解决是动态的，而 ES6 Module 是静态的。由 require 可以通过 if 语句判断来是否加载某个模块可以看出，而且 require 支持导入的语句是一个表达式。恰恰相反，ES6 Module 不支持表达式导入，并且导入导出语句必须在模块的顶层作用域。因此，ES6 Module 是静态的模块结构，它在代码的编译阶段即可分析出模块的依赖关系。相比较之下，ES6 Module 有以下优势：死代码检测和排除、模块变量类型检查、编译器优化。

值拷贝与动态映射：在导出一个模块时，对于 CommonJS 来说获取的是一份导出值的拷贝，而 ES6 Module 中则是值的动态映射，并且这个映射是只读的。例：

CommonJS
```js
// calculator.js
var count = 0
module.exports = {
  count: count,
  add: function(a, b) {
    count += 1
    return a + b
  }
}

// index.js
var count = require('./calculator.js).count
var add = require('./calculator.js).add
console.log(count) // 0 (这里的count是对calculator.js中count值的拷贝)
add(2, 3)
console.log(count) // 0 (calculator.js中变量值的改变不会对这里的拷贝值造成影响)

count += 1
console.log(count) // 1 (拷贝的值可以更改)
```

ES6 Module
```js
// calculator.js
let count = 0
const add = function(a, b) {
  count += 1
  return a + b
}
export {count, add}

// index.js
import {count, add} from './calculator.js
console.log(count) // 0 (对calculator.js中count值的映射)
add(2, 3)
console.log(count) // 1 (实时反映calculator.js中count值的变化)

// count += 1 // 不可更改，会抛出SyntaxError: "count" is read-only
```

## 资源输入输出

#### 资源入口配置

Webpack 通过 context 和 entry 共同决定入口文件的路径。context 可以理解为资源入口的路径前缀，在配置时要求必须使用绝对路径。它也可以省略，默认值为当前工程的根目录。entry 可以使用字符串、数组、对象甚至是函数进行定义。**entry 还有一个作用是定义 chunk name，在使用字符串和数组的情况下无法定义，默认为 main**，使用对象定义时 chunk name 为键名。在 webpack 优化时可以使用对象的形式为 vendor 配置一个入口来提升性能。

```js
module.export = {
  context: path.join(__dirname, './src'),
  entry: {
    app: './src/app.js',
    vendor: ['react', 'react-dom', 'react-router']
  }
}
```

这里我们没有为 vendor 设置入口路径，webpack需要借助插件 `optimization.splitChunks` 将 app 和 vendor 这两个 chunk 中的公共模块提取出来。这样，就能实现业务代码和第三方模块的分离，利用客户端缓存，可以有效地提升用户后续请求页面时的加载速度。

#### 资源出口配置

```js
const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'assets'),
    publicPath: '/dist/'
  }
}
```

**filename**: 可以是字符串也可以是模板，使用模板就要用到入口配置中的 chunk name，一般多用于多页应用，如下面的例子，name 会被替换成 chunk name。

```js
module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor.js'
  },
  output: {
    filename: '[name].js'
  }
}
```

**path**：path 用于指定资源输出的位置，要求值必须为绝对路径。如：

```js
const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  }
}
```

**publicPath**：publicPath 用来指定资源的请求位置。

:::tip
顺便说一下关于 Node 的 path 模块：

- path.join 字符拼接并进行路径规范化
- path.resolve 绝对路径，相当于将路径逐一进行 cd 操作
- __dirname 被执行 JS 的绝对路径
:::

## 预处理器（loader）

Webpack 可处理不同资源类型的文件，如 HTML、CSS、模板、图片、字体等，这些都是通过 loader 来实现的。

**每个 loader 的本质都是一个函数。**

**css-loader**：css-loader 的作用是将模块中的css加载语法进行解析，如 @import 和 url() 函数等。

**style-loader**：style-loader 的作用是将解析后的 css 用 style 标签的形式插入页面中。因此，style-loader 常常与 css-loader 一起使用。

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 排除指定目录下的模块，还有include选项，但exclude优先级更高
        exclude: /node_modules/, 
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

**babel-loader**：babel-loader 用来处理 ES6+ 并将其编译为 ES5。下载 `yarn add babel-loader @babel/core @babel/preset-env --dev`，babel-loader 是 Babel 与 Webpack 协同工作的模块；@babel/core 是 Babel 编译器的核心模块；@babel/preset-env 是 Babel 官方推荐的预置器，可根据用户设置的目标环境自动添加所需的插件和补丁来编译 ES6+ 代码。

除了使用下面的方式配置以外，babel-loader 也支持从 .babelrc 文件读取 Babel 配置，因此可以将 presets 和 plugins 从 Webpack 配置文件中提取出来，也能达到相同的效果。

```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        // 禁止@babel/preset-env 将ES6 Module转化为CommonJS
        presets: [[
          'env', {
            modules: false, 
          }
        ]]
      }
    }
  }
]
```

**file-loader**：file-loader 用于打包文件类型的资源，并返回其 publicPath。

```js
const path = require('path')

module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  }
}
```

**url-loader**：url-loader 与 file-loader 作用类似，唯一的不同在于用户可以设置一个文件大小的阈值，当大于该阈值时与 file-loader 一样返回 publicPath，而小于该阈值时则返回文件 base64 形式编码。

```js
rules: [
  {
    test: /\.(png|jpg|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: '[name].[ext]',
        publicPath: './assets-path/'
      }
    }
  }
]
```

**vue-loader**：vue-loader 用来处理 vue 组件，它可以将组件的模板、JS 及样式进行拆分。在项目中，实际上它还需要 vue-template-compiler 来编译 Vue 模板，以及 css-loader 来处理样式。下载` yarn add vue-loader vue vue-template-compiler css-loader -D`

```js
rules: [
  {
    test: /\.vue$/,
    use: 'vue-loader'
  }
]
```

#### 自定义loader

假设我们要实现一个 loader，它会为所有 JS 文件启用严格模式 `"use strict"`。

首先，创建一个 force-strict-loader 目录，然后在该目录下执行 npm 初始化命令。

```
yarn init -y
```

接着创建 index.js

```js
module.exports = function(content) {
  var useStrictPrefix = '\'use strict\';\n\n'
  return useStrictPrefix + content
}
```

现在我们可以在 Webpack 工程中安装并使用这个 loader 了。

```
yarn add <path-to-loader>/force-strict-loader
```

修改 Webpack 配置：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: 'force-strict-loader'
    }
  ]
}
```

此时对该工程进行打包即可看到效果。

当文件输入和其依赖没有发生变化时，应该让 loader 直接使用缓存。

```js
// force-strict-loader/index.js
module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable()
  }
  var useStrictPrefix = '\'use strict\';\n\n'
  return useStrictPrefix + content
}
```

通过缓存可以加快 Webpack 打包速度。

loader 的配置项通过 use.options 传进来，如：

```js {8}
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: 'force-strict-loader',
        options: {
          sourceMap: true
        }
      }
    }
  ]
}
```

要想在 loader 中获取它需要安装一个依赖库 loader-utils，它主要用于提供一些帮助函数。

```
yarn add loader-utils
```

```js
// force-strict-loader/index.js
var loaderUtils = require('loader-utils')

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable()
  }
  // 获取和打印otions
  var options = loaderUtils.getOptions(this) || {}
  console.log('options', options)

  // 处理content
  var useStrictPrefix = '\'use strict\';\n\n'
  return useStrictPrefix + content
}
```

接下来实现 source-map，source-map 可以便于实际开发者在浏览器控制台查看源码。

```js
// force-strict-loader/index.js
var loaderUtils = require('loader-utils')
var SourceNode = require('source-map').SourceNode
var SourceMapConsumer = require('source-map').SourceMapConsumer

module.exports = function(content, sourceMap) {
  var useStrictPrefix = '\'use strict\';\n\n'
  if (this.cacheable) {
    this.cacheable()
  }
  // source-map
  var options = loaderUtils.getOptions(this) || {}
  if (options.sourceMap && sourceMap) {
    var currentRequest = loaderUtils.getCurrentRequest(this)
    var node = SourceNode.fromStringWithSourceMap(
      content,
      new SourceMapConsumer(sourceMap)
    )
    node.prepend(useStrictPrefix)
    var result = node.toStringWithSourceMap({
      file: currentRequest
    })
    var callback = this.async()
    callback(null, result.code, result.map.toJSON())
  }
  // 不支持source-map的情况
  return useStrictPrefix + content
}

```

## 样式处理

前面介绍的方法通过 style 标签引入样式明显是不符合生产环境的，我们需要把 css 通过 link 标签引入，这样才能更好的利用客户端缓存。

#### mini-css-extract-plugin

这是 Webpack4 官方推荐的插件，它相比 extract-text-webpack-plugin（webpack4以前版本适用）最重要的就是支持按需加载 css。

```js
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
```

Sass：下载安装`yarn add sass-loader node-sass --dev`。

```js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
  ]
}
```

Less 与 Sass 类似，它要安装`yarn add less less-loader --dev`

PostCSS：PostCSS 并不能算一个 CSS 的预编译器，它只是一个编译插件的容器。下载安装`yarn add postcss-loader --dev`。PostCSS 最广泛的用途是与 Autoprefixer 给 css 添加浏览器前缀，如 transform 等新特性。他需要一个单独的配置文件 postcss.config.js。

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }
  ]
}
```

```js
// postcss.config.js
const autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [
    autoprefixer({
      grid: true, // 支持使用网格布局
      browsers: [
        '>1%',
        'last 3 versions',
        'android 4.2',
        'ie 8'
      ]
    })
  ]
}
```

## 代码分片

代码分片（code-splitting）是 Webpack 作为打包工具所特有的一项技术，通过这项技术我们可以把代码按照特定的形式进行拆分，使用户不必一次全部加载，而是按需加载。

#### 通过入口划分代码

```js
// webpack.config.js
entry: {
  app: './app.js',
  lib: ['lib-a', 'lib-b', 'lib-c']
}

// index.html
<script src="dist/lib.js"></script>
<script src="dist/app.js"></script>
```

这种拆分方法主要适用于那些将接口绑定在全局对象上的库，因为业务代码中的模块无法直接引用库中的模块，二者属于不同的依赖树。

#### CommonsChunkPlugin

CommonsChunkPlugin 是 Webpack4 之前内部自带的插件，它可以将多个 chunk 中公共的部分提取处理。我们先从一个例子中对比使用 CommonsChunkPlugin 后的结果，下面是未使用 CommonsChunkPlugin 的配置：

```js
// webpack.config.js
module.exports = {
  entry: {
    foo: './foo.js',
    bar: './bar.js'
  },
  output: {
    filename: '[name].js'
  }
}

// foo.js
import React from 'react'
document.write('foo.js', React.version)

// bar.js
import React from 'react'
document.write('bar.js', React.version)
```

这样的配置的打包结果是：分别打包了 foo.js 和 bar.js，并且 React 分别被打包进对应的模块，也就是被重复打包了。

更改 webpack.config.js，添加 CommonsChunkPlugin。

```js
// webpack.config.js
const webpack = require('webpack')

module.exports = {
  entry: {
    foo: './foo.js',
    bar: './bar.js'
  },
  output: {
    filename: '[name].js'
  },
  plugins: [
    // 使用webpack内部的CommonsChunkPlugin函数创建一个插件实例
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons', // 指定公共chunk的名字
      filename: 'commons.js' // 提取后的资源文件名
    })
  ]
}
```

此次打包将多产出一个 commons.js，而 foo.js 和 bar.js 的打包文件中将不包含 react，而是把它提取到了 commons.js。

当然，我们也可以使用 CommonsChunkPlugin 提取单入口的应用，只需要单独为第三方类库创建一个入口即可：

```js
// webpack.config.js
const webpack = require('webpack')
module.exports = {
  entry: {
    app: './app.js',
    vendor: ['react']
  },
  output: {
    filename: '[name].js'
  },
  plugins: {
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  }
}

// app.js
import React from 'react'
document.write('app.js', React.version)
```

设置提取范围和提取规则：

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js',
    // 只从a.js和b.js中提取公共模块
    chunks: ['a', 'b'], 
    // 只有当某个模块被n个入口同时引用才会进行提取，不影响通过数组形式入口传入的模块的提取（就是说上面的react始终会被提取）
    // 设置为Infinity表示出数组形式入口中的模块其他公共模块均不提取，
    minChunk: 3, 
  })
]
```

#### optimization.SplitChunks

optimization.SplitChunks 是 Webpack4 为了改进 CommonsChunk-Plugin 而重新设计和实现的代码分片特性。使用 SplitChunks 来提取 react 试试：

```js
// webpack.config.js
module.exports = {
  entry: './foo.js',
  output: {
    filename: 'foo.js',
    publicPath: '/dist/'
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

// foo.js
import React from 'react'
import('./bar.js')
document.write('foo.js', React.version)

// bar.js
import React from 'react'
console.log('bar.js', React.version)
```

SplitChunks 的默认配置如下：

```js
splitChunks: {
  // async 只提取异步chunk, initial 只对入口 chunk 生效， all 两种模式同时开启
  chunks: 'async',
  minSize: {
    javascript: 30000,
    style: 50000
  },
  maxSize: 0,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    // 提取node_modules中符合条件的模块
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      priority: -10,
    },
    // 被多次引用的模块
    default: {
      minChunks: 2,
      priority: -20,
      resueExistingChunk: true
    }
  }
}
```

## 生产环境配置

生产环境的配置与开发环境有所不同，比如要设置 mode、环境变量，为文件名添加 chunk hash 作为版本号等。

环境变量：通常我们需要为生产环境和本地环境添加不同的环境变量，在 Webpack 中可以使用 DefinePlugin 进行设置。

```js
// webpack.config.js
const webpack = require('webpack')
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    })
  ]
}

// app.js
document.write(ENV)
```

许多框架和库都采用 process.env.NODE_ENV 作为一个区别开发环境和生产环境的变量。process.env 是 Node.js 用于存放当前进程环境变量的对象，而 NODE_ENV 则可以让开发者指定当前的运行时环境。

```js
new webpack.DefinePlugin({
  process.env.NODE_ENV: 'production'
})
```

如果启动了 mode: production，则 Webpack 已经设置好了 process.env.NODE_ENV。

#### source map

source map 指的是将编译、打包、压缩后的代码映射回源代码的过程。生成的 map 文件可能会很大，但是不用担心，只要不打开开发者工具，默认的 map 文件不会被加载。

javascript 的 source map 的配置很简单：

```js
module.exports = {
  // ...
  devtool: 'source-map'
}
```

css、scss、less 则需要额外的配置：

```js
const path = require('path')

module.exports = {
  // ...
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
```

#### 资源压缩

压缩 JavaScript 大多数时候使用的工具有两个，一个是 UglifyJS（webpack3已集成），另一个是 terser（webpack4已集成）。后者由于支持 ES6+ 代码的压缩，更加面向于未来，因此官方在 Webpack4 中默认使用了 terser 的插件 terser-webpack-plugin。

在webpack3中开启压缩：

```js
const webpack = require('wepback')
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```

在 Webpack4 中，这项配置被移到了 config.optimization.minimize。

```js
module.exports = {
  // ...
  optimization: {
    minimize: true // 开启mode: production的默认配置，不需要设置
  }
}
```

#### 压缩css

压缩 css 文件的前提是使用 extract-text-webpack-plugin 或 mini-css-extract-plugin 将样式提取出来，接着使用 optimize-css-assets-webpack-plugin 来进行压缩，这个插件本质上使用的是压缩器 cssnano。

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')
cosnt OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        // 生效范围：只压缩匹配到的资源
        assetNameRegExp: /\.optimize\.css$/g,
        // 压缩处理器，默认为cssnano
        cssProcessor: require('cssnano'),
        // 压缩处理器配置的配置
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        },
        // 是否展示log
        canPrint: true
      })
    ]
  }
}
```

#### 缓存

资源 hash：我们通常使用 chunkhash 来作为文件版本号：

```js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle@[chunkhash].js'
  },
  mode: 'production'
}
```

#### 输出动态HTML（html-webpack-plugin）

每次手动引入 JS 很麻烦，我们可以借助 html-webpack-plugin 来实现资源名的同步。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    // html-webpack-plugin支持个性化配置（https://github.com/jantimon/html-webpack-plugin）
    new HtmlWebpackPlugin()
  ]
}
```

#### bundle 体积监控和分析

Webpack 有一个很有用的工具---webpack-bundle-analyzer，它能够帮助我们分析一个 bundle 的构成。使用方法很简单：

```js
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // ...
  plugin: [
    new Analyzer()
  ]
}
```

它可以帮我们生成一张 bundle 的模块组成结构图，每个模块所占的体积一目了然。

最后我们还需要自动化的对资源体积进行监控，bundlesize 可以帮助做到这一点。安装之后只需要在 package.json 进行配置即可：

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "bundlesize": [
    {
      "path": "./bundle.js",
      "maxSize": "50kb"
    }
  ],
  "scripts": {
    "test:size": "bundlesize"
  }
}
```

## 打包优化

#### HappyPack

我们先来看一下代码转译的工作流程：

- 从配置中获取打包入口；
- 匹配 loader 规则，并对入口模块进行转译；
- 对转译后的模块进行依赖查找；
- 对新找到的模块重复惊醒步骤 2、3，直到没有新的依赖模块。

可以看出，上面的流程是一个递归则过程，而 Webpack 是单线程的，它只能逐个的对模块进行转译。HappyPack 解决的就是这个痛点，它的核心特性是可以开启多个线程，并行地对不同模块进行转译。

单个 loader 的优化：一般地，HappyPack 适用于那些转译任务比较重的工程，如 babel-loader 和 ts-loader，而对于其他的如 sass-loader、less-loader 的优化效果不大明显。

```js
// 初始webpack配置
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    ]
  }
}

// 使用HappyPack的配置
const HappyPack = require('happyPack')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 原有配置上添加happypack
        loader: 'happypack/loader'
      }
    ]
  },
  plugins: [
    new HappyPack({
      // 将原有配置迁移到HappyPack参数中
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      ]
    })
  ]
}
```

多个 loader 的优化：多个 loader 需要为每一个 loader 配置一个 id：

```js
const HappyPack = require('happypack')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=js'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts'
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          options: {}
        }
      ]
    }),
    new HappyPack({
      id: 'ts',
      loaders: [
        {
          loader: 'ts-loader',
          options: {}
        }
      ]
    })
  ]
}
```

#### 缩小打包范围

合理使用 exclude 和 include。

noParse：有些库我们希望 Webpack 完全不要去进行解析，即不希望应用任何 loader 规则，库的内部也不会有对其他模块的依赖。下面的例子将会忽略所有文件名中包含 lodash 的模块，这些模块仍然会被打包进资源文件，只不过 Webpack 不会对其进行任何解析。

```js
module.exports = {
  // ...
  module: {
    noParse: /lodash/
  }
}
```

cache：有些 loader 会有一个 cache 配置项，用来在编译代码后同时保存一份缓存，下次编译时则只编译变化了的文件。

tree shaking：webpack 提供了 tree shaking 功能，帮助我们检测工程中没有被引用过得模块，这部分代码将永远无法被执行到，因此也被称为“死代码”。

```js
// index.js
import {foo} from './util'
foo()

// util.js
export function foo() {
  console.log('foo')
}
// 没有被任何其他模块引用，属于“死代码”
export function bar() {
  console.log('bar')
}
```

在 Webpack 打包时会对 bar() 添加一个标记，在正常开发模式下它仍然存在，只是在生产环境的压缩那一步会被一出掉。

tree shaking 可以使 bundle 体积显著减少，但实现 tree shaking 需要一些前提条件：tree shaking 只能对 ES6 Module 生效。而为了更好的兼容性，目前的 npm 包大部分还在使用 CommonJS 的形式。

**如果我们在工程中使用了 babel-loader，那么一定要通过配置来禁用它的模块依赖解析**。因为如果由 babel-loader 来做依赖解析，webpack 接收到的就都是转化过的 CommonJS 形式的模块，无法进行 tree-shaking。禁用 babel-loader 模块依赖解析的配置示例如下：
```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // 这里一定要加上modules: false
                [
                  @babel/preset-env, 
                  {
                    modules: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
}
```

## 开发环境调优

#### webpack-dashboard

webpack-dashboard 以表格的形式展示构建后的包的信息。

![](https://i.imgur.com/qL6dXJd.png)

配置：

```js
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js'
  },
  mode: 'development',
  plugins: [
    new DashboardPlugin()
  ]
}
```

要使 webpack-dashboard 生效还要改一下 webpack 的启动方式：

```json
{
  "script": {
    // "dev": "webpack-dev-server"
    "dev": "webpack-dashboard -- webpack-dev-server"
  }
}
```

#### webpack-merge

对于需要多种打包环境的项目来说，webpack-merge 是一个非常实用的工具。假设我们的项目有 3 种不同的配置，通过 webpack.common.js 提取公共部分：

```js
// webpack.common.js
module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```

针对生产环境配置 webpack.prod.js，假设不借助任何工具：

```js
// webpack.prod.js
const commonConfig = require('./webpack.common.js')

module.exports = Object.assign(commonConfig, {
  mode: 'production'
})
```

这样看起来似乎也没什么毛病，但是假如我们需要在 webpack.prod.js 中的修改某一个 loader 的话，则需要重写整个 module 对象，因为用 Object.assign 没办法准确找到某个具体的 loader 规则进行替换。下面看看使用 webpack-merge 来解决这个问题：

```js
// webpack.prod.js
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge.smart(commonConfig, {
  mode: 'production',
  module: {
    rules: [
      // 不借助工具需要复制webpack.common.js中其他所有rules
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
})
```

我们用 merge.smart 替换了 Object.assign。webpack-merge 在合并 module.rules 的过程中会以 test 属性作为标识符，当发现有相同项出现的时候以后面的规则覆盖前面的规则。

#### speed-measure-webpack-plugin

![](https://raw.githubusercontent.com/stephencookdev/speed-measure-webpack-plugin/HEAD/preview.png)

speed-measure-webpack-plugin 简称为 SMP。SMP 可以分析出 webpack 整个打包过程中在各个 loader 和 plugin 上耗费的时间。使用非常简单：

```js
// webpack.config.js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  entry: './app.js',
  // ...
})
```

#### HMR

HMR 即 Hot Module Replacement（模块热替换），webpack 支持在不刷新页面的情况下更新模块，但 HMR 需要手动开启。而且项目必须是基于 webpack-dev-server 或者 webpack-dev-middle 开发的，webpack 本身的命令行并不支持 HMR。

```js
const webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
}
```


完！！！






<Vssue :title="$title" />
