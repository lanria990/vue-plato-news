<template>
  <div class="loading">
    <i></i><span>{{msg}}</span>
  </div>
</template>

<script>
  export default{
    data () {
      return { msg: '更新中...' }
    },
    created () {
      console.log('Component loading created')
    },
    destroyed () {
      console.log('Component loading destroyed')
    }
  }

</script>
