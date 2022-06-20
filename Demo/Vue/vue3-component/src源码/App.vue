<template>
  <div id="app">响应式原理{{ change }}</div>
  <button @click="goChange">改变ref</button>
</template>

<script setup>
// import { effect, reactive } from '@vue/reactivity';
import { reactive } from './reactive';
import { effect } from './reactivity/effect';
import { ref } from './ref';
import { computed } from './computed/computed';

let dummy;
const counter = reactive({ num1: 1, num2: 2 });
const change = ref(false);

const goChange = () => {
  change.value = true;
};
const changeComputed = computed(() => {
  return counter.num1;
});
effect(() => {
  dummy = counter.num1 + counter.num2;
  // console.log(dummy); // 每次counter.num1修改都会打印日志
  // console.log(change.value);
  console.log(change);
});
setInterval(() => {
  counter.num1++;
}, 1000);
</script>

<style scoped></style>
