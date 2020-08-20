module.exports = {
  title: '林河前端之路',
  description: '前端笔记整理',
  base: '/', // github
  head: [
    ['link', { rel: 'icon', href: '/linhe.jpg' }],
  ],
  base: '/', // 这是部署到github相关的配置
  port: 4396,
  extraWatchFiles: [
    '.vuepress/config.js', // 使用相对路径
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-135701184-2' 
      }
    ],
    [
      '@vssue/vuepress-plugin-vssue', 
      {
        locale: 'zh',
        platform: 'github',
        owner: 'imlinhe',
        repo: 'imlinhe.github.io',
        clientId: 'fae53e244022d47c67b5',
        clientSecret: '5e889a5769ce43575d4e0425ae63c5b97db4e720',
      }
    ],
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom'
  ],
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
    smoothScroll: true, // 启动页面滚动
    logo: '/linhe.jpg',
    nav:[
      { text: 'Home', link: '/'},
      { text: '博文', link: '/pages/blog/javascript/Webpack配置指南' }, // 内部链接 以docs为根目录
      { text: '摘要', link: '/pages/abstract/code/一行代码实现时间戳转时分秒'},
      { text: '读书', link: '/pages/book/js-programme/01-Javascript简介' },
      { text: 'GitHub', link: 'https://github.com/imlinhe'}  
    ],
    sidebar: {
      '/pages/blog/': [         
        {
          title: 'JavaScript',   // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          children: [
            ['javascript/Webpack配置指南', 'Webpack配置指南'],
            ['javascript/JavaScript基础', 'JavaScript基础'],
            ['javascript/前端实现图片压缩上传', '前端实现图片压缩上传'],
            ['javascript/数组去重方式', '数组去重方式'],
            ['javascript/encodeURI和encodeURIComponent', 'encodeURI和encodeURIComponent'],
            ['javascript/原型和原型链', '原型和原型链'],
            ['javascript/防抖和节流', '防抖和节流'],
            ['javascript/函数柯里化', '函数柯里化'],
            ['javascript/字符串方法', '字符串方法'],
            ['javascript/谈谈get和post的区别', '谈谈get和post的区别'],
          ]
        },
        {
          title: 'CSS',
          collapsable: false,
          children: [
            ['css/Css基础', 'Css基础'],
            ['css/Css3和Html5新特性不完全手册', 'Css3和Html5新特性不完全手册'],
            ['css/Css3伪类', 'Css3伪类'],
          ]
        },
        {
          title: 'Vue', 
          collapsable: false,
          children: [
            ['vue/Vue项目性能优化', 'Vue项目性能优化'],
            ['vue/Vue_history模式配置', 'Vue_history模式配置'],
            ['vue/Vue实战项目总结', 'Vue实战项目总结'],
            ['vue/Element远程搜索Bug', 'Element远程搜索Bug'],
            ['vue/Vue面试题汇总', 'Vue面试题汇总'],
          ]
        },
        {
          title: 'Git',   
          collapsable: false, 
          children: [
            ['git/Git常用命令', 'Git常用命令'], 
            ['git/Git配置和错误', 'Git配置和错误'], 
            ['git/Git生成多个公钥', 'Git生成多个公钥'], 
          ]
        },
        {
          title: 'Others',
          collapsable: false,
          children: [
            ['others/跨域解决方案', '跨域解决方案'],
            ['others/一道算法题', '一道算法题'],
            ['others/VSCode插件和配置', 'VSCode插件和配置'],
            ['others/彻底理解浏览器的缓存机制', '彻底理解浏览器的缓存机制'],
            ['others/在第三方页面调用微信接口', '在第三方页面调用微信接口'],
            ['others/移动端遮罩阻止滚动方案', '移动端遮罩阻止滚动方案'],
            ['others/Content-type的几种常见类型', 'Content-type的几种常见类型'],
            ['others/前端安全', '前端安全'],
          ]
        }
      ],
      '/pages/abstract/': [
        { 
          title: '代码摘要', 
          collapsable: false,
          children: [
            ['code/一行代码实现时间戳转时分秒', '一行代码实现时间戳转时分秒'],
            ['code/饿了么Dialog组件二次封装', '饿了么Dialog组件二次封装'],
            ['code/椭圆运动轨迹', '椭圆运动轨迹'],
            ['code/常用scss函数表', '常用scss函数表'],
            ['code/公共方法汇总', '公共方法汇总'],
            ['code/浮点数运算误差', '浮点数运算误差'],
            ['code/isEqual', 'isEqual'],
            ['code/ESLint配置项', 'ESLint配置项'],
            ['code/电话号码分段', '电话号码分段'],
            ['code/Canvas签名', 'Canvas签名']
          ]
        },
        {
          title: '其他',
          collapsable: false,
          children: [
            ['others/切换镜像源', '切换镜像源'],
            ['others/Cmder右键启动', 'Cmder右键启动']
          ]
        }
      ],
      '/pages/book/': [
        {
          title: 'JS高级程序设计',   // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          children: [
            ['js-programme/01-Javascript简介', '01-Javascript简介'],
            ['js-programme/02-在HTML中使用Javascript', '02-在HTML中使用Javascript']
          ]
        },
      ]
      //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    }
  }
}
