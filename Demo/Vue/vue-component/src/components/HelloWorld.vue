<template>
  <div></div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['title'],
  render(createElement) {
    alert(1);
    return createElement(
      'h2',
      {
        id: 'app2',
        title: this.title,
      },
      this.$slot.default
    );
  },
};
</script>

<style></style>
