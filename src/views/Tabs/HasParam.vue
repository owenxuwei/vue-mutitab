<template>
    <div>
        参数值：{{val}}
    </div>
</template>

<script>
    export default {
        props:['name'],
      data() {
          return {
              val: ""
          }
      },
      mounted(){
          this.val = this.$route.params.name;
      }
    }
</script>

<style scoped>

</style>