<template>
  <el-scrollbar wrap-class="scrollbar-wrapper-y">
     <div style="height:100px"></div>
    <input type="text" value="测试">
    <button @click="reflush()">刷新</button>
    <div></div>
    <div>
      <button @click="to()">强制跳转（刷新）</button>
    </div>
    <div style="height:200px">
      <button @click="to1()">跳转（不刷新）</button>
    </div>
    <div>测试滚动条：</div>
    <div>离开页面会记住滚动条位置，进入页面会恢复滚动条位置</div>
    <div style="height:400px"></div>
  </el-scrollbar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("tab", ["reflush"]),
    to() {
      this.$store.commit("tab/DelCache", "home.hasparam");
      var val = new Date().getTime();
      this.$router.push("/home/hasparam/" + val);
    },
    to1() {
      var val = new Date().getTime();
      this.$router.push("/home/hasparam/" + val);
    }
  },
  inject: ["reload"]
};
</script>

<style scoped>
</style>