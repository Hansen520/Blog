<template>
  <div>
    我是home2页面
  </div>
</template>

<script>
export default {
  name: 'Homeb',
  beforeRouteEnter(to) {
    console.log('beforeRouterEnter-homeb', to)
  },
  beforeRouteUpdate(to) {
    console.log('beforeRouteUpdate-homeb', to)
  },
  beforeRouteLeave(to, from) {
    console.log('beforeRouteLeave-homeb', to, from)
  }
}
</script>

<style></style>
