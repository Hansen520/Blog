import { inject } from 'vue'

// 创建容器，返回一个store(多例的), 先创建一个默认的store
export const storeKey = 'store'
// vue内部已经将inject等api导出来了
export function useStore(injectKey = null) {
  return inject(injectKey != null ? injectKey : storeKey)
}
