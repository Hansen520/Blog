// import { Fragment } from 'vue'

// export default {
//   name: 'ElTimeline',
//   props: {
//     reverse: {
//       type: Boolean,
//       default: false
//     }
//   },
//   provide() {
//     return {
//       timeline: this
//     }
//   },
//   render() {
//     const reverse = this.reverse
//     const classes = {
//       'el-timeline': true,
//       'is-reverse': reverse
//     }
//     let slots
//     if (this.$slots.default) {
//       slots = this.$slots.default()
//       let children
//       if (slots.length > 0 && slots[0].type === Fragment) {
//         children = slots[0].children
//       } else {
//         children
//       }
//       if (reverse) {
//         children.reverse()
//       }
//     }
//     return <ul class={classes}>{ slots }</ul>
//   }
// }

export const Timeline = (props)=>{
  const timeline = [
      <div class="start">8.21 开始自由职业</div>,
      <div class="online">10.18 专栏上线</div>
  ]
  if(props.reverse){
      timeline.reverse()
  }
  return <div>{timeline}</div>
}