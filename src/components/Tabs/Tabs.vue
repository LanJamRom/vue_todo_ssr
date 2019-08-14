<template>
  <div class="helper">
    <span class="left">{{unFinishedTodo}} items left</span>
    <span class="tabs">
      <span v-for="(state, index) in states" :key="index" :class="[state, filter === state ? 'actived':'']"
      @click="toggleFilter(state)">
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
  export default {
    props: {
      filter: {
        type: String,
        required: true
      },
      todos: Array
    },
    data() {
      return {
        states: ['all', 'active', 'completed']
      }
    },
    computed: {
      unFinishedTodo() {
        return this.todos.reduce((prev,todo) => prev + (!todo.completed? 1 : 0), 0)
      }
    },

    methods: {
      toggleFilter(state) {
        this.$emit('toggleFilter',state)
      },
      clearAllCompleted() {
        this.$emit('clearAllCompleted')
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .helper
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing antialiased
  .left, .clear, .tabs
    padding 0 10px
  .left .clear
    width 150px
  .left
    text-align center
  .clear
    text-align right
    cursor pointer
  .tabs
    width 200px
    display flex
    justify-content space-between
    *
      display inline-block
      padding 0 10px
      cursor pointer
      border 1px solid rgba(175,47,47,0)
      &.actived
        border-color rgba(175,47,47,0.4)
        border-radius 5px
</style>
