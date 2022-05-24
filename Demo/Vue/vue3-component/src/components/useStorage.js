import { ref, watchEffect } from 'vue';
export function useStorage(name, value = '[]') {
  // value是避免初始化的时候无数据而报错
  let data = ref(JSON.parse(localStorage.getItem(name) || value));
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value));
  });
  return data;
}
