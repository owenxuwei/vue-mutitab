//菜单配置
var menus = [
    {
        icon:"el-icon-menu",
        title:"权限管理",
        children:[
            {title:"首页",routername:'home.index'},
            {title:"模块配置",routername:'home.flowchart'},
            {title:"测试tab",routername:'home.test'}
        ]
    },
    {
        icon:"el-icon-document",
        title:"角色管理"
    },
    {
        icon:"el-icon-location",
        title:"人员管理"
    },
    {
        icon:"el-icon-menu",
        title:"权限管理",
        children:[
            {title:"系统配置"},
            {title:"模块配置"},
            {title:"权限配置"}
        ]
    }
];

menus.forEach((menu1,index1)=>{
    menu1.index=index1.toString();
    if(menu1.children){
        menu1.children.forEach((menu2,index2)=>{
            menu2.index=index1+'.'+index2;
            if(menu2.children){
                menu2.children.forEach((menu3,index3)=>{
                    menu3.index=index1+'.'+index2+'.'+index3;
                })
            }
        })
    }
})


export default menus