import Vue from 'vue'
const whiteList = ['login']// 免登录白名单
Vue.mixin({
  activated() {
    //滚动条位置（ 注意：el-scrollbar 一定要是根节点 ）
    if (this.$$top&&this.$el.className=="el-scrollbar") {
      this.$el.firstElementChild.scrollTop = this.$$top;
    }
  },
  beforeRouteLeave(to, from, next) {
    //滚动条位置（ 注意：el-scrollbar 一定要是根节点 ）
    if(this.$el.className=="el-scrollbar"){
      this.$$top = this.$el.firstElementChild.scrollTop;
    }

    next();
  },
    beforeRouteEnter(to, from, next){
      if (whiteList.indexOf(to.name) !== -1) { // 在免登录白名单，直接进入
        next()
      }
      else{
        // if(localStorage.getItem("_token")){
            next()
        // }
        // else
        //   next('/login')
      }
    }
  })