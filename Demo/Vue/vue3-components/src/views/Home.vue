<template>
  <div class="home">
    home/about
    <router-link to="/a">a页面</router-link>
    <router-link to="/b">b页面</router-link>
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
