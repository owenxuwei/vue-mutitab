<template>
    <div class='nav_bar'>
        <h1 class='logo' :class="{'is-active':isActive}">
            <img src="../../assets/images/top_logo.png" alt="">
            <span v-if='!isActive'>权限认证</span>
        </h1>
        <div class='open_aside'>
               <svg
                       :class="{'is-active':isActive}"
                       class="hamburger"
                       viewBox="0 0 1024 1024"
                       xmlns="http://www.w3.org/2000/svg"
                       width="64"
                       height="64"
                       @click="toggleSideBar">
                   <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"/>
               </svg>
        </div>
        <div class="navbar-custom-menu">
            <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                   <img class="user-image" src="../../assets/images/timg.jpg" alt="">
                      <i class='hidden-xs'>administrator</i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

    export default {
        name: "home",
        props: {
            isActive: {
                type: Boolean,
                default: false
            },
            toggleSideBar: {
                type: Function,
                default: null
            }
        },
        data: function () {
            return {};
        },

        mounted() {

        },
        methods: {}
    };
</script> 

<style lang='scss' scoped>

    .nav_bar {
        width: 100%;
        background-color: #337ab7;
        .logo {
            float: left;
            height: 50px;
            text-align: center;
            width: 200px;
            // background-color: #27404c;
            line-height: 50px;
            img {
                vertical-align: middle;
                margin-top: -6px;
            }
            &.is-active {
                width: 64px;
                img {
                    vertical-align: middle;
                    margin-top: -6px;
                }
            }
            span {
                font-weight: 400;
                font-size: 22px;
                color: #fff;
                margin-left: 6px;
            }
        }

    }


    .open_aside {
        float: left;
        width: 36px;
        text-align: center;
        line-height: 48px;
        border-radius: 4px;
        padding-top: 8px;
        &:hover{
            background-color: #367fa9
        }
        .hamburger {
            display: inline-block;
            cursor: pointer;
            width: 24px;
            height: 24px;
            /*vertical-align: middle;*/
            fill: #fff;
        }

        .hamburger.is-active {
            transform: rotate(180deg);
        }
    }

    .navbar-custom-menu {
        float: right;
        cursor: pointer;
        margin-right: 10px;
        .user-image {
            float: left;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-right: 10px;
            margin-top: 12px;
        }
        .hidden-xs {
            color: #fff;
        }
    }


</style>