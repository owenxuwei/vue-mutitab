<template>
  <div class="tabbody">
    <div class='tab_box'>
       <span
               v-for="(tab,index) in Tabs"
               class="el-tag"
               :class="{'active':CurTabIndex==index}"
               @click="ActiveTab(index)"
               :key="tab.routername"
       >
       <s class='tab_rect'></s>
      {{tab.title}}
      <i v-if="tab.closable" @click="DelTab(index,$event)" class="el-icon-close"></i>
    </span>
    </div>
      <el-main>
    <keep-alive>
        <router-view v-if="isRouterAlive" ref='cur'/>
    </keep-alive>
      </el-main>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "tab-view",
  data() {
    return {
      CurTabName: "2"
    };
  },
  computed: {
    ...mapState("tab", ["CurTabIndex", "Tabs","isRouterAlive"])
  },
  methods: {
    ...mapMutations("tab", ["ActiveTab"]),
    DelTab(index, e) {
      e.stopPropagation();
      this.$store.commit("tab/DelTab", index);
    },
    reload () {
    }  
  },
  provide(){
    return {
      reload: this.reload
    }
  }
};
</script>

<style lang='scss' scoped>
.tabbody {
  height: 100%;
  overflow: hidden;
}
.el-main {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 36px;
  // height: 100%;
  padding: 1px 0 1px 1px;
  overflow: hidden;
}

  .tab_box {
    border-bottom: 1px solid #ddd;
    background-color: #f1f1f1;
    .el-tag{
      cursor: pointer;
      display: inline-block;
      height: 35px;
      line-height: 35px;
      border-right: solid 1px #ddd;
      border-top: solid 1px #ddd;
      border-bottom: none;
      border-left: none;
      color: #475059;
      background: #f1f1f1;
      padding: 0 10px;
      font-size: 12px;
      border-radius: 0;
      i{
        color: #495060;
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
    .el-tag.active{
      background-color: #fff;
      color: #666;
      border-bottom-color: #fff;
        height: 36px;
      margin-bottom: -1px;
      i{
        color: #666;
      }
      // .tab_rect {
      //   content: "";
      //   background: #fff;
      //   display: inline-block;
      //   width: 8px;
      //   height: 8px;
      //   border-radius: 50%;
      //   position: relative;
      //   margin-right: 2px;
      // }
    }
  }

</style>