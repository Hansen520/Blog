<template>
  <div>
    <h1>Route props</h1>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/hello/you">/hello/you</router-link></li>
      <li><router-link to="/static">/static</router-link></li>
      <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
      <li><router-link to="/attrs">/attrs</router-link></li>
    </ul>
    <router-view></router-view>
    <button @click="go">去树形菜单</button>
    <button @click="go1">去测试</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  methods: {
    go() {
      this.$router.push('/getTree');
    },
    go1() {
      this.$router.push('/test');
    },
  },
};
</script>

<style></style>
