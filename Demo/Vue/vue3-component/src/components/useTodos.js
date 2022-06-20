import { ref, computed } from 'vue';
import { useStorage } from '../utils/useStorage';
export function useTodos() {
  let title = ref('');
  let showModal = ref(false);
  // 获取缓存中的数据
  let todos = useStorage('todos');
  console.log(todos, 8);
  function addTodo() {
    if (!title.value) {
      showModal.value = true;
      setTimeout(() => {
        showModal.value = false;
      }, 1500);
      return;
    }
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = '';
  }
  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }
  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });
  let all = computed(() => todos.value.length);

  let allDone = computed({
    get: function () {
      return active.value === 0;
    },
    set: function (val) {
      todos.value.forEach((todo) => (todo.done = val));
    },
  });

  return { title, todos, addTodo, clear, active, all, allDone, showModal };
}
