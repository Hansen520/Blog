<template>
  <div id="app">
    <h1>Route props</h1>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/hello/you">/hello/you</router-link></li>
      <li><router-link to="/static">/static</router-link></li>
      <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
      <li><router-link to="/attrs">/attrs</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      a: 1,
      b: 2,
      c: 3,
    };
  },
  components: {},
  mounted() {
    console.log(this);
    window.vue = this;
    const res = {
      a: 15,
      b: 20,
    };
    console.log(this);
    Object.assign(this.$data, res);
    console.log(this.a, this.b, this.c);
  },
};
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
