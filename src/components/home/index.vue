<template>
  <el-container>
    <el-header>
      <div @click="logOut">退出</div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',
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
    }
  }
}
</script>

<style scoped lang='less'>
.el-container {
  // 比如修改el-container 直接修改同名 .el-container
  border: 1px solid red;
  .el-header {
    border: 1px solid blue;
  }
  .el-aside {
    border: 1px solid black;
  }

  .el-main {
    border: 1px solid pink;
  }
}
</style>
