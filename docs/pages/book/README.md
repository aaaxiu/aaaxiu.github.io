<template>
  <div>
    <NavigationChunk :routerInfo="jsProgrammeRouterInfo">JS高级程序设计</NavigationChunk>
  </div>
</template>

<script>
const jsProgrammeContext = require.context( './js-programme/', false, /.md$/)

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
      jsProgrammeRouterInfo: routeInfo(jsProgrammeContext, 'js-programme')
    }
  }
}
</script>
