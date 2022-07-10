import { defineStore } from 'pinia';

export const useCounterStore = defineStore('count', {
  id: 'count',
  state: () => {
    return {
      count: 1,
    };
  },
  getters: {
    finished(state) {
      return state;
    },
  },
  actions: {
    add() {
      this.count++;
    },
  },
});
