<template>
  <div class="todolist">
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没有输入！</div>
      </div>
    </transition>

    <h2>todoList</h2>
    <input
      type="text"
      v-model="title"
      @keydown.enter="addTodo"
      placeholder="按回车执行"
    />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选 <input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>
  </div>
</template>

<script setup>
import { useTodos } from './useTodos';
const { title, todos, addTodo, clear, active, all, allDone, showModal } =
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
  position: relative;
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
</style>
