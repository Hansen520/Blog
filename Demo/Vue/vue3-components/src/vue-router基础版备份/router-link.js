import { h, inject } from 'vue'

function useLink(props) {
  const router = inject('router')
  function navigate() {
    router.push(props.to)
  }
  return {
    navigate
  }
}
export const RouterLink = {
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  setup(props, { slots }) {
    const link = useLink(props)
    return () => {
      // 虚拟节点-> 真实节点
      return h(
        'a',
        {
          onClick: link.navigate,
          href: 'javascript:void(0)'
        },
        slots.default && slots.default()
      )
    }
  }
}
