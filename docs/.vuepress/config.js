const {blogSideBar, bookSideBar, abstractSideBar} = require('./readdir')

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
      { text: '博文', link: '/pages/blog/' }, // 内部链接 以docs为根目录
      { text: '摘要', link: '/pages/abstract/'},
      { text: '读书', link: '/pages/book/' },
      { text: 'GitHub', link: 'https://github.com/imlinhe'}  
    ],
    sidebar: {
      '/pages/blog/': blogSideBar,
      '/pages/book/': bookSideBar,
      '/pages/abstract/': abstractSideBar
      //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    }
  }
}
