<template>
  <div>{{ count.count }}</div>
  <Button @click="add">pinia的增加</Button>
</template>

<script setup>
import { useCounterStore } from '../pinia/count';
const count = useCounterStore();

function add() {
  count.add();
}
</script>

<style></style>
