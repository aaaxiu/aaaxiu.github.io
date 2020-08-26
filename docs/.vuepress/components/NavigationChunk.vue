<template>
  <div>
    <h3>
      <slot></slot>
    </h3>
    <ul>
      <li v-for="item in routerInfo">
        <router-link :to="item.path">{{item.fileName}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "NavigationChunk",
  props: {
    routerInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
