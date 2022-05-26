<template>
  <div @click="add">{{ count }}</div>
  <div @click="asyncAdd">{{ count }}</div>
</template>

<script setup>
import { computed } from 'vue';
// import { useStore } from '../store/gvuex';
import { useStore } from 'vuex';
let store = useStore();
let count = computed(() => store.state.count);
function add() {
  store.commit('add', '11');
}
function asyncAdd() {
  store.dispatch('asyncAdd');
}
</script>

<style></style>
