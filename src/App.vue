<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue'
  import Footer from './components/Footer/Footer.vue'
  import Todo from './components/Todo/Todo.vue'
  export default {
    components: {
      Header,
      Footer,
      Todo
    },
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" >
  #app
    position: absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
      position: absolute
      left 0
      right 0
      top 0
      bottom 0
      background-color: #999
      opacity .4
      z-index -1
</style>
