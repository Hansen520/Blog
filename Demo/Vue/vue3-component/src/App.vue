<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
@import './style/theme.css';

body {
  height: 100%;
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
</style>
