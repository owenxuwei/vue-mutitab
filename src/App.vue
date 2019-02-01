<template>
  <div id='app'>
      <!-- <keep-alive exclude='login'> -->
      <router-view/>
      <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      transition: 'test'
    }
  },
}
</script>


<style>
#app {

  height: 100%;
}
</style>
