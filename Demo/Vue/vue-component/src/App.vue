<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted() {
    window.vue = this
  }
}
</script>

<style>
* {
  background-color: #efefef;
}
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
}
</style>
