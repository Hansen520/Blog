<template>
  <div>
      <input type="text" v-model="title" @keydown.enter="addTodo" placeholder="按回车执行">
      <button v-if="active < all" @click="clear">清理</button>
      <ul v-if="todos.length">
        <li v-for="(todo, index) in todos" :key="index">
            <input type="checkbox" v-model="todo.done"/>
            <span :class="{ done: todo.done }">{{ todo.title }}</span>
        </li>
      </ul>
      <div v-else>暂无数据</div>
      <div>
          全选 <input type="checkbox" v-model="allDone"/>
          <span>{{active}}/{{all}}</span>
      </div>
  </div>
</template>

<script setup>
import { useTodos } from './useTodos'
const {
    title,
    todos,
    addTodo,
    clear,
    active,
    all,
    allDone
    } = useTodos()
</script>

<style>
h1{
    color: red;
}
.done{
    text-decoration: line-through;
    color: #999;
}
</style>