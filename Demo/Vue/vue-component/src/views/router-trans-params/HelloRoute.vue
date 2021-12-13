<template>
  <div>
    <div>Hello {{ $route.params }}和{{ this.name }}</div>
  </div>
</template>

<script>
export default {
  props: ['name'],
};
</script>

<style></style>
