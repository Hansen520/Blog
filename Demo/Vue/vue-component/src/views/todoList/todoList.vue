<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" placeholder="按回车执行">
    <ul v-if="todos.length">
      <li v-for="(todo,i) in todos" :key="i">
        <input type="checkbox" v-model="todo.done">
        <span :class="{done: todo.done}">{{todo.title}}</span>
        {{todo}}
      </li>
    </ul>
    <div v-else>
      暂无数据
    </div>
    <div>
      全选：<input type="checkbox" v-model="allDone"/>
      计数：<span>{{active}} / {{all}}</span>
      清理：<button v-if="active < all" @click="clear">清理</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'todolist',
    data() {
      return {
        title: '',
        todos: [{title: '吃饭', done: false},{title: '睡觉', done: true}]
      }
    },
    computed: {
      active() {
        return this.todos.filter(v => !v.done).length
      },
      all() {
        return this.todos.length
      },
      // 这种写法避开了在data定义数据，很好
      allDone: {
        get() {
          return this.active === 0
        },
        set(val) {
          this.todos.forEach((todo) => {
            todo.done = val
          })
        }

      }
    },
    methods: {
      addTodo() {
        this.todos.push({
          title: this.title,
          done: false
        })
        this.title = ''
      },
      clear() {
        this.todos = this.todos.filter(v => !v.done)
      }
    }
    

}
</script>

<style>
.done{
  color: gray;
  text-decoration: line-through;
}
</style>