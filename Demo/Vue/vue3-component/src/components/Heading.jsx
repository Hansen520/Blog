import { defineComponent, h } from 'vue'
// 但是如果是复杂的场景，h 函数写起来就显得非常繁琐，需要自己把所有的属性都转变成对象
export default defineComponent({
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  // setup(props, { slots }) {
  //   return () => h(
  //     'h' + props.level, // 标签名
  //     {}, // prop 或attribute
  //     slots.default() // 子节点
  //    )
  // }

  // 改写
  setup(props, { slots }) {
    const tag = 'h' + props.level// 标签
    return () => <tag>{ slots.default() }</tag>
  }
})