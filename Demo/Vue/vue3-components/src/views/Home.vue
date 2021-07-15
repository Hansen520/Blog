<template>
  <div class="home">
    <hr />
    二级导航
    <router-link to="/a">a页面</router-link>||
    <router-link to="/b">b页面</router-link>
    <hr />
    页面展示
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {},
  beforeRouteEnter(to, from) {
    console.log('beforeRouterEnter', to, from)
  },
  beforeRouterUpdate(to, from) {
    console.log('beforeRouterUpdate', to)
  },
  beforeRouteLeave(to, from) {
    console.log('beforeRouteLeave', to, from)
  }
}
</script>

<style></style>
