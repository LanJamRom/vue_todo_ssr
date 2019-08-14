<template>
  <section class="real-app">
    <input type="text" class="add-input" autofocus="autofocus" placeholder="接下去要做什么"
           @keyup.enter="addTodo" v-model="addItem">
    <Item v-for="(todo,index) in filteredTodos" :key="index" :todo="todo" @delete="deleteItem"></Item>
    <Tabs :filter="filter" :todos="todos" @toggleFilter="toggleFilter" @clearAllCompleted="clearAllCompleted"></Tabs>
  </section>
</template>

<script>
  import Item from '../Item/Item.vue'
  import Tabs from '../Tabs/Tabs.vue'
  let id = 0
  export default {
    data() {
      return {
        addItem: '',
        todos: [],
        filter: 'all'
      }
    },
    computed: {
      filteredTodos() {
        if(this.filter === 'all') {
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo() {
        this.todos.unshift({
          id: id+1,
          content: this.addItem,
          completed: false
        })
        this.addItem = ''
      },
      deleteItem(id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleFilter(state) {
        this.filter = state
      },
      clearAllCompleted() {
        this.todos = this.todos.filter(todo => todo.completed === false)
      }
    },
    components: {
      Item,
      Tabs
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666

    .add-input
      position relative
      margin 0
      width 100%
      font-size 24px
      font-family inherit
      font-weight inherit
      line-height 1.4em
      border none
      outline none
      color inherit
      box-sizing border-box
      font-smoothing antialiased
      padding 16px 16px 16px 36px
      box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
</style>
