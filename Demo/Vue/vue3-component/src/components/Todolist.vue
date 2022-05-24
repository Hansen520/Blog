<template>
  <div class="todolist">
    <span class="dustbin">🗑</span>
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没有输入！</div>
      </div>
    </transition>
    <input
      type="text"
      v-model="title"
      @keydown.enter="addTodo"
      placeholder="按回车执行"
    />
    <button v-if="active < all" @click="clear">清理</button>

    <div v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, i) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
        </li>
      </transition-group>
    </div>
    <div v-else>暂无数据</div>
    <div>
      全选 <input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>

    <div class="animate-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="animate" v-show="animate.show">📋</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useTodos } from './useTodos';

let animate = reactive({
  show: false,
  el: null,
});
// 找到初始化动画的位置
function beforeEnter(el) {
  let dom = animate.el;
  let rect = dom.getBoundingClientRect();
  let x = window.innerWidth - rect.left - 60;
  let y = rect.top - 10;
  el.style.transform = `translate3d(-${x}px, ${y}px, 0)`;
}

function enter(el, done) {
  document.body.offsetHeight;
  el.style.transform = `translate3d(0, 0, 0)`;
  el.addEventListener('transitionend', done);
}
function afterEnter(el) {
  animate.show = false;
  el.style.display = 'none';
}
function removeTodo(e, i) {
  animate.el = e.target;
  animate.show = true;
  todos.value.splice(i, 1);
}
const { title, todos, active, all, allDone, showModal, addTodo, clear } =
  useTodos();
</script>

<style scoped>
h1 {
  color: red;
}
.done {
  text-decoration: line-through;
  color: #999;
}
.todolist {
  width: 300px;
  border: 1px solid green;
}
.info-wrapper {
  position: absolute;
  right: 0;
  top: 20px;
  width: 100px;
}
.info {
  padding: 10px;
  color: white;
  font-size: 14px;
  background-color: #d88986;
}

/* transition 动画 */
.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
/* transition-group 动画 */
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* 移出 */
.remove-btn {
  cursor: pointer;
}
/* 垃圾桶抛出动画 */
.dustbin {
  font-size: 20px;
  position: fixed;
  right: 10px;
  top: 10px;
  font-size: 40px;
}
.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 11px;
  font-size: 40px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>
