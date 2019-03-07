# 基于vue多tab页实现
本模板提供了最精简实现的代码，简单易懂，以及灵活控制tab的接口。
[演示demo](http://owenowen.iask.in/index.html "演示demo")  账号superadmin 密码666666
![example](https://raw.githubusercontent.com/owenxuwei/vue-mutitab/master/example.png)

## 多tab页实现常见问题
* tab页面数据的缓存统一管理
* tab页面关闭，缓存自动释放,以及tab页面缓存手动清除，灵活控制。
* tab打开数量限制
* tab页面的滚动条状态
* tab页面的跳转调用以及刷新
* tab页面实现逻辑与业务系统逻辑分离，甚至取消tab，系统可以正常使用。

### 接口帮助手册
* 打开tab页面：直接使用this.$router.push();若页面已存在，则激活已存在的tab。
* 手动删除某路由的缓存： this.$store.commit("tab/DelCache", "xxxxx");"xxxxx"为该页面路由的name
* 强制刷新当前页面： this.$store.dispatch("tab/reflush")

## 如何快速在已有项目中引入？引入步骤：
* 1.tab实现的代码为 TabCtrl.js、TabView.vue 两个文件。
* 2.全局store注入子模块 tab 例如：
```javascript
 import tab from './components/TabCtrl'
 export default new Vuex.Store({
    state: {
    },
    mutations: {
    
    },
    actions: {
    
    },
    modules:{
        tab
    }
})
```
* 3.配置路由（懒加载路由也一样） 注意： 路由名称为必须配置项; tab显示的标题，暂时放到meta属性里面; 例如：
```javascript
 {
      path: '/home',
      name: 'home',
      redirect:'home/index',
      // component: Home
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      children:[
        {
          path: '/home/index',
          name: 'home.index',
          meta :{title:"首页"},
          component: () => import(/* webpackChunkName: "about" */ './views/Tabs/Index.vue')
        },
        {
          path: '/home/test',
          name: 'home.test',
          meta :{title:"测试tab"},//此处为规则配置页面 title为Tab显示的标题
          component: () => import(/* webpackChunkName: "about" */ './views/Tabs/Test.vue')
        },
        {
          path: '/home/hasparam/:name',
          name: 'home.hasparam',
          meta :{title:"带参数"},//此处为规则配置页面 title为Tab显示的标题
          component: () => import(/* webpackChunkName: "about" */ './views/Tabs/HasParam.vue'),
          props:true
        }
      ]
    }
```
* 4.修改TabCtrl.js 更改默认 app路由配置文件、 tab打开最大数量、 打开页面。
```javascript
 import router from '../router' //app路由配置文件
 import Vue from 'vue'

 var maxtab = 6;//tab打开最大数量配置
 var defaulttab = {//默认打开页面
    title: '首页',
    routername: 'home.index',//路由名称
    routerparams: null,//路由参数
    closable: false
 };
```
* 5.替换<router-view/> 
```html
 <router-view/>
```
为 
```html
 <tab-view/>
```
* 6.您可能还需要修改tab标签的样式。最后编译成功。恭喜你，你自己的项目已经可以实现多tab页导航的功能。

