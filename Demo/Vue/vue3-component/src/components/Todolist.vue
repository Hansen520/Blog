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
import { ref, computed } from 'vue'
let title = ref('')
let todos = ref([{title: '学习 Vue', done: false}])
function addTodo() {
    todos.value.push({
        title: title.value,
        done: false
    })
    title.value = ''
}
function clear() {
    todos.value = todos.value.filter(v => !v.done)
}
let active = computed(() => {
    return todos.value.filter((v) => !v.done).length
})
let all = computed(() => todos.value.length)

let allDone = computed({
    get: function() {
        return active.value === 0
    },
    set: function(val) {
        todos.value.forEach(todo => todo.done = value)
    }
})
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