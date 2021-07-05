<template>
  计数: {{ test }}
  <button @click="add">增加1</button>
  <button @click="dec">减少1</button>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    let test = ref(0);
    function add() {
      test.value++;
    }
    function dec() {
      test.value--;
    }
    return {
      test,
      dec,
      add,
    };
  },
};
</script>

<style></style>
