
<!-- 登录 -->
<template>
  <div class="login">
    <div class="left">
      <img src="../../assets/imgs/login_img.png"
           alt="" />
    </div>
    <div class="right">
      <div class="avater">
        <img src="../../assets/imgs/login_logo.png"
             alt="" />
      </div>
      <div class="title">后台管理系统</div>
      <el-form label-width="80px"
               :rules="rules"
               ref="ruleForm"
               :model="ruleForm">
        <el-form-item label="名称"
                      prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  mounted () { },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return false
        }

        // try {
        const { data: res } = await this.$http.post('login', this.ruleForm)
        // console.log(1)
        // console.log(res)

        if (res.meta.status !== 200) {
          return this.$message('用户名密码错误')
          // return false
        }
        console.log(res.data)
        // console.log(2)
        this.$message('登录成功')
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        // console.log(3)
        // this.$router.push('/home')
        this.$router.push({ path: '/home' }).catch(() => { })
        // console.log(4)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
* {
  margin: 0px;
  padding: 0px;
}
.login {
  background-color: #93defe;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    img {
      padding-right: 80px;
      width: 400px;
    }
  }
  .right {
    background-color: #fff;
    width: 500px;
    height: 400px;
    // border: 1px solid red;
    position: relative;
    .avater {
      background-color: white;
      border: 4px solid #93defe;
      width: 120px;
      height: 120px;
      text-align: center;
      line-height: 110px;
      border-radius: 100px;
      position: absolute;
      left: 90px;
      top: -60px;
    }
    .title {
      // border: 1px solid red;
      text-align: center;
      margin-top: 100px;
      font-size: 24px;
    }
    .el-form {
      .el-button {
        margin: 10px;
        padding: 10px;
      }
    }
  }
}
</style>
