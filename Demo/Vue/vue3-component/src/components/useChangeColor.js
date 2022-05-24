import { ref } from 'vue';
export function useChangeColor() {
  const count = ref(1);
  let color = ref('red');
  function add() {
    count.value++;
    color.value = Math.random() > 0.5 ? 'blue' : 'red';
  }
  return {
    color,
    count,
    add,
  };
}
