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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { setTheme } from './style/themeUtil';

const checked = ref(false);
const logoUrl = ref('/src/assets/logo-light.png');
// 换图
const loadImg = async () => {
  let name = !checked.value ? 'light' : 'dark';
  let ext = !checked.value ? 'png' : 'jpg';
  let res = await import(`./assets/logo-${name}.${ext}`);
  console.log(res, 24);
  logoUrl.value = res.default;
};
const changeTheme = function () {
  console.log(checked.value);
  setTheme(!checked.value);
  loadImg();
};
</script>

<style scoped>
@import './style/theme.css';
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
</style>
