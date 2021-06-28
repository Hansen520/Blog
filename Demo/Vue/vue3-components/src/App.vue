<template>
  计数器: {{ count }}
  <!-- state: {{ count }}
  <hr />
  double: {{ double }}
  <hr />
  <button @click="add">同步修改</button>
  <hr />
  <button @click="asyncAdd">异步修改</button> -->
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/vuex/index.js'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    function add() {
      store.commit('add', 1)
    }
    function asyncAdd() {
      store.dispatch('asyncAdd', 1)
    }

    return {
      count: computed(() => store.state.count),
      double: computed(() => store.getters.double),
      add,
      asyncAdd
    }
  }
}
</script>

<style></style>
