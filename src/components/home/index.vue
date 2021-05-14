<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <div @click="logOut">退出</div>
      </el-header>

      <el-container style="border:1px solid red">
        <div class="sidebar">
          <el-aside :width="isCollapse ? '64px' : '200px'">
            <div style="cursor:pointer"
                 @click="isCollapse = !isCollapse">
              点我折叠
            </div>
            <el-menu :default-active="$route.path"
                     :collapse-transition="false"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     background-color="#545c64"
                     text-color="#fff"
                     unique-opened
                     router
                     :collapse="isCollapse"
                     active-text-color="#ffd04b">
              <!-- index 是字符串 -->
              <el-submenu :index="item.id + ''"
                          v-for="item in menuList"
                          :key="item.id">
                <template slot="title">
                  <i :class="iconObj[item.id]"></i>
                  <!-- {{iconObj[item.id]}} -->
                  <span slot="title">{{item.authName}}</span>
                </template>

                <el-menu-item :index="'/' +subItem.path "
                              v-for="subItem in item.children"
                              :key="subItem.id">
                  <i class="el-icon-menu"></i>{{subItem.authName}}

                </el-menu-item>

              </el-submenu>
            </el-menu>

          </el-aside>
        </div>
        <div class="content">
          <el-main style="border:1px solid red">
            <router-view></router-view>
          </el-main>
        </div>

      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: '',
  data () {
    return {
      menuList: [],
      iconObj: {
        201: 'iconfont icon-shouye',
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju'
      },
      isCollapse: false
    }
  },
  methods: {
    logOut () {
      this.$confirm('logout？', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'yes',
        cancelButtonText: 'no'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '退出登录'
          })
          sessionStorage.clear()
          this.$router.push('/login')
        })
        .catch(action => {
          // this.$message({
          //   type: 'info',
          //   message: action === 'cancel'
          //     ? '放弃保存并离开页面'
          //     : '停留在当前页面'
          // })
        })
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
    }
  },
  created () {
    console.log(this.$route.path)
    this.getMenuList()
  }
}
</script>

<style scoped lang='less'>
.wrapper {
  height: 100%;
  // max-height: 100%;
  // 比如修改el-container 直接修改同名 .el-container
  border: 1px solid red;
  .el-header {
    border: 1px solid blue;
    height: 40px !important;
    cursor: pointer;
    background-color: grey !important;
    color: white;
    vertical-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar {
    border: 1px solid black;
    .el-aside {
      .el-menu {
        min-height: 100vh;
        margin: 0px;
        padding: 0px;
        .iconfont {
          margin-right: 10px;
        }
      }
      .content {
        border: 1px solid red;
        height: 100%;
        // width: 100%;
      }
    }
  }
}
</style>
