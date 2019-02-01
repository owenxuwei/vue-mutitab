
import router from '../router' //app路由配置文件
import Vue from 'vue'

var maxtab = 6;//tab打开最大数量配置
var defaulttab = {//默认打开页面
    title: '首页',
    routername: 'home.index',//路由名称
    routerparams: null,//路由参数
    closable: false
};

Vue.mixin({
  activated() {
    var title="新页面";
    if(this.$route.meta&&this.$route.meta.title) title = this.$route.meta.title;
    else{
        console.warn("您还未配置该路由的Tab页面显示的标题！{meta:{tile:'页面名称'}}")
    }
    if(!this.$route.name) throw "您未配置该页面路由名称 {name}"
    this.$store.commit('tab/OpenTab',{routername:this.$route.name,routerparams:this.$route.params,title:title,component:this})
  }
})

const removecomponent = (component) => {
    if (component.$vnode && component.$vnode.data.keepAlive) {
        if (component.$vnode.parent && component.$vnode.parent.componentInstance && component.$vnode.parent.componentInstance.cache) {
            if (component.$vnode.componentOptions) {
                var key = component.$vnode.key == null
                    ? component.$vnode.componentOptions.Ctor.cid + (component.$vnode.componentOptions.tag ? `::${component.$vnode.componentOptions.tag}` : '')
                    : component.$vnode.key;
                var cache = component.$vnode.parent.componentInstance.cache;
                var keys = component.$vnode.parent.componentInstance.keys;
                if (cache[key]) {
                    if (keys.length) {
                        var index = keys.indexOf(key);
                        if (index > -1) {
                            keys.splice(index, 1);
                        }
                    }
                    delete cache[key];
                }
            }
        }
    }
    component.$destroy();
}



export default {
    namespaced: true,
    state: {
        isRouterAlive:true,
        CurTabIndex: 1,
        Tabs: [defaulttab]
    },
    mutations: {
        ActiveTab(state, index) {
            var routerconfig = { name: state.Tabs[index].routername };
            if(state.Tabs[index].routerparams) routerconfig.params = state.Tabs[index].routerparams;
            router.push(routerconfig);
        },
        OpenTab(state, tab) {
            tab.closable = true;
            const item = state.Tabs.find(t => t.routername == tab.routername);
            if (item) {
                if(tab.routerparams) item.routerparams = tab.routerparams;
                if(tab.component) item.component = tab.component;
                state.CurTabIndex = state.Tabs.indexOf(item);
            }
            else {
                state.Tabs.push(tab);
                if(state.Tabs.length>maxtab){
                    removecomponent(state.Tabs[1].component);
                    state.Tabs.splice(1,1);
                }
                state.CurTabIndex = state.Tabs.length - 1;
            }
        },
        DelTab(state, index) {
            removecomponent(state.Tabs[index].component);//删除缓存和销毁组件
            state.Tabs.splice(index, 1);
            if (state.CurTabIndex === index) {
                if(state.CurTabIndex===0){
                    if(!state.Tabs.length){ router.push('/');return;}
                }
                else{
                    if(state.Tabs.length===1||state.CurTabIndex!==1)
                        state.CurTabIndex--;
                }
                router.push({name:state.Tabs[state.CurTabIndex].routername,params:state.Tabs[state.CurTabIndex].routerparams});//页面跳转
                
            }
            else {
                if (index < state.CurTabIndex) state.CurTabIndex--;
            }
        },
        DelCache(state,routername){
            const item = state.Tabs.find(t => t.routername == routername);
            if(item&&item.component) removecomponent(item.component);
        },
        Flush(state){//刷新当前路由
            if(state.isRouterAlive){
                removecomponent(state.Tabs[state.CurTabIndex].component);//删除缓存和销毁组件
            }
            state.isRouterAlive=!state.isRouterAlive;
        }
    },
    actions: {
        reflush ({commit,state}) {//刷新当前路由
            commit('Flush');
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                  commit('Flush');
                  resolve()
                }, 0)
              })
        }
    }
}
