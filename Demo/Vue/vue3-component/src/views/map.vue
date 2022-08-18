<template>
  <div id="container"></div>
</template>

<script setup>
const map = new BMapGL.Map('container');
const point = new BMapGL.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
</script>

<style lang="scss" scoped>
#container {
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
</style>
