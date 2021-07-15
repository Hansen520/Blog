<template>
  <div>
    我是homea页面
  </div>
</template>

<script>
export default {
  name: 'Homea',
  beforeRouteEnter(to, from) {
    console.log('beforeRouteEnter-homea', to, from)
  },
  beforeRouteUpdate(to) {
    console.log('beforeRouteUpdate-homea', to)
  },
  beforeRouteLeave(to, from) {
    console.log('beforeRouteLeave-homea', to, from)
  }
}
</script>

<style></style>
