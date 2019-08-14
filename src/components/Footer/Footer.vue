<template>
  <div id="footer">
    <span>Written by {{author}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        author: 'Lan'
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  #footer
    margin-top 40px
    text-align center
    color #EE8262
    font-size 30px
    text-shadow 0 1px 0
</style>
