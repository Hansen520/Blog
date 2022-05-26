<template>
  <div>
    HOME
    <h5>鼠标位置</h5>
    x: {{ x }} y: {{ y }}
  </div>
  <h5>todolist</h5>
  <h5>更改颜色值</h5>
  <div class="updateColor">
    <h1 @click="add">{{ count }}</h1>
  </div>
  <h5>修改favicon图标</h5>
  <button @click="loading">更改favicon图标</button>
  <h5>通过vueUse取做一些实例</h5>
  <button @click="fullscreen">全屏</button>
  <h5>通过组件传参获取星星</h5>
  {{ score }}
  <!-- <Rate :value="score" @update-rate="updateRate" theme="blue"></Rate> -->
  <Rate v-model="score" theme="blue">
    <img width="14" src="/favicon.ico" />
  </Rate>
  <Rate
    :modelValue="score"
    @update:modelValue="score = $event"
    theme="blue"
  ></Rate>
</template>

<script setup>
import { ref } from 'vue';
import { useMouse } from '../components/useMouse';
import { useChangeColor } from '../components/useChangeColor';
import useFavicon from '../components/useFavicon';
import { useFullscreen } from '@vueuse/core';
import Rate from '../components/Rate.vue';
// 监听相应书数据
const { x, y } = useMouse();
const { color, count, add } = useChangeColor();
/* 修改favicon图标 */
let { favicon } = useFavicon();
function loading() {
  favicon.value = '/greek.png';
}
/* 利用useVue来调用hooks函数 */
const { isFullscreen, enter, exit, toggle } = useFullscreen();
function fullscreen() {
  console.log(isFullscreen(), enter, exit, toggle, 36);
}

/* 更改星星 */
let score = ref(3.5);
// function updateRate(num) {
//   score.value = num;
// }
</script>

<style scoped>
.updateColor {
  width: 200px;
  border: 1px solid red;
}
h1 {
  /* 这又是一种好写法 */
  color: v-bind(color);
  cursor: pointer;
}
</style>
