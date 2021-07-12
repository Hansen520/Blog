<template>
  <div class="home">
    <router-link to="/a">a页面</router-link>
    <router-link to="/b">b页面</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style></style>
