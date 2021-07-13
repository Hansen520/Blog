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
  mounted() {
    console.log(this.$router)
    console.log(this.$route)
  }
}
</script>

<style></style>
