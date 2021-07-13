<template>
  <div>
    主页
    <hr />
    一级导航
    <router-link to="/a">手写的vue-router</router-link>|
    <router-link to="/vuex">手写的vuex页</router-link>
    <br /><br />
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
