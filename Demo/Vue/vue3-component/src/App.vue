<template>
  <div id="app">
    <span>{{ checked === true ? '暗色' : '亮色' }}</span>
    <input
      v-model="checked"
      type="checkbox"
      class="switch"
      @change="changeTheme"
    />
    主题切换
    <img :src="logoUrl" alt="图片" />
    <hr />
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <hr />
    <router-view></router-view>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { setTheme } from './style/themeUtil';

const checked = ref(false);
const logoUrl = ref('/src/assets/行动中心.svg');
// 换图
const loadImg = async () => {
  let name = !checked.value ? '业绩' : '学习';
  let ext = !checked.value ? 'svg' : 'svg';
  let res = await import(`./assets/${name}中心.${ext}`);
  console.log(res, 24);
  logoUrl.value = res.default;
};
const changeTheme = function () {
  setTheme(!checked.value);
  loadImg();
};
</script>

<style scoped>
@import './style/theme.css';

body {
  margin-bottom: 9000px;
}
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--theme-color);
  border-bottom: 1px solid var(--theme-boder-color);
  background-color: var(--theme-bg);
}
a {
  text-decoration: none;
  color: green;
  margin-right: 10px;
}
</style>
