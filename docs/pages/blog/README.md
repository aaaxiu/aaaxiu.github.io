<template>
  <div>
    <NavigationChunk :routerInfo="javascriptRouterInfo">JavaScript</NavigationChunk>
    <NavigationChunk :routerInfo="cssRouterInfo">CSS</NavigationChunk>
    <NavigationChunk :routerInfo="vueRouterInfo">Vue</NavigationChunk>
    <NavigationChunk :routerInfo="gitRouterInfo">Gits</NavigationChunk>
    <NavigationChunk :routerInfo="othersRouterInfo">Others</NavigationChunk>
  </div>
</template>

<script>
const javascriptContext = require.context( './javascript/', false, /.md$/)
const cssContext = require.context( './css/', false, /.md$/)
const vueContext = require.context( './vue/', false, /.md$/)
const gitContext = require.context( './git/', false, /.md$/)
const othersContext = require.context( './others/', false, /.md$/)

function routeInfo(context, folder) {
  const keys = context.keys()
  return keys.map(item => {
    const fileName = item.split('/')[1].split('.')[0]
    const path = `./${folder}/${fileName}.html`
    return { path, fileName }
  })
}

export default {
  name: "blogDir",
  data () {
    return {
      javascriptRouterInfo: routeInfo(javascriptContext, 'javascript'),
      cssRouterInfo: routeInfo(cssContext, 'css'),
      vueRouterInfo: routeInfo(vueContext, 'vue'),
      gitRouterInfo: routeInfo(gitContext, 'git'),
      othersRouterInfo: routeInfo(othersContext, 'others'),
    }
  }
}
</script>
