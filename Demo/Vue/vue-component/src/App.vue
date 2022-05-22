<template>
  <div id="app">
    <button @click="go">去树形菜单</button>
    <button @click="go1">去测试</button>
    <button @click="go2">去首页</button>
    <button @click="go3">去todolist</button>
    <hr color="green"/><br/>
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
  methods: {
    go() {
      this.$router.push('/getTree');
    },
    go1() {
      this.$router.push('/test');
    },
    go2() {
      this.$router.push('/');
    },
    go3() {
      this.$router.push('/todolist');
    },
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
