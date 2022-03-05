import { h, inject, provide, computed } from 'vue'
export const RouterView = {
  name: 'RouterView',
  setup(props, { slots }) {
    const depth = inject('depth', 0)
    const injectRoute = inject('route location')
    const matchedRouteRef = computed(() => injectRoute.matched[depth])
    provide('depth', depth + 1)

    return () => {
      const matchRoute = matchedRouteRef.value
      const viewComponent = matchRoute && matchRoute.components.default

      if (!viewComponent) {
        return slots.default && slots.default()
      }
      return h(viewComponent)
    }
  }
}
