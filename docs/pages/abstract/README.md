<template>
  <div>
    <NavigationChunk :routerInfo="codeRouterInfo">代码摘要</NavigationChunk>
    <NavigationChunk :routerInfo="othersRouterInfo">其他</NavigationChunk>
  </div>
</template>

<script>
const codeContext = require.context( './code/', false, /.md$/)
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
      codeRouterInfo: routeInfo(codeContext, 'code'),
      othersRouterInfo: routeInfo(othersContext, 'others'),
    }
  }
}
</script>
