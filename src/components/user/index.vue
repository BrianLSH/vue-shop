<!-- 用户列表 -->
<template>
  <div class="wrapper">
    <!-- 面包屑开始 -->
    <div class="crumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑结束 -->

    <!-- 列表结束 -->
    <div class="card">
      <el-card class="box-card">
        <!-- 搜索结束 -->
        <div class="search">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input placeholder="请输入内容"
                          size="small"
                          v-model="queryInfo.query"
                          class="input-with-select">
                  <el-button slot="append"
                             @click="getList"
                             icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button size="small"
                           @click="centerDialogVisible = true"
                           type="primary">添加用户</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 搜索结束 -->

        <!-- 添加对话框开始 -->
        <el-dialog title="添加用户"
                   :visible.sync="centerDialogVisible"
                   width="30%"
                   center>
          <el-form :model="ruleForm"
                   :rules="rules"
                   size="mini"
                   ref="ruleForm"
                   label-width="70px"
                   class="demo-ruleForm">
            <el-form-item label="有户名"
                          prop="username">
              <el-input size="mini"
                        width='50%'
                        v-model="ruleForm.username">
              </el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
              <el-input size="mini"
                        width='50%'
                        v-model="ruleForm.password">
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱"
                          prop="email">
              <el-input size="mini"
                        width='50%'
                        v-model="ruleForm.email">
              </el-input>
            </el-form-item>
            <el-form-item label="手机"
                          prop="mobile">
              <el-input size="mini"
                        width='50%'
                        v-model="ruleForm.mobile">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer"
                class="dialog-footer">
            <el-button size="small"
                       @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       size='small'
                       @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 添加对话框结束 -->
        <!-- 修改对话框开始 -->
        <el-dialog title="修改用户"
                   :visible.sync="editDialogVisible"
                   width="30%"
                   center>
          <el-form :model="editForm"
                   :rules="editFormRules"
                   size="mini"
                   ref="editForm"
                   label-width="70px"
                   class="demo-ruleForm">
            <el-form-item label="有户名"
                          prop="username">
              <el-input size="mini"
                        width='50%'
                        disabled
                        v-model="editForm.username">
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱"
                          prop="email">
              <el-input size="mini"
                        width='50%'
                        v-model="editForm.email">
              </el-input>
            </el-form-item>
            <el-form-item label="手机号"
                          prop="mobile">
              <el-input size="mini"
                        width='50%'
                        v-model="editForm.mobile">
              </el-input>
            </el-form-item>

          </el-form>
          <span slot="footer"
                class="dialog-footer">
            <el-button size="small"
                       @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       size='small'
                       @click="editUser">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改对话框结束 -->
        <!-- 列表开始 -->
        <div class="list">
          <el-table border
                    :data=tableData
                    style="width: 100%">
            <el-table-column type="index"
                             label="序号">
            </el-table-column>
            <el-table-column prop="username"
                             label="姓名"
                             width="80">
            </el-table-column>
            <el-table-column prop="email"
                             label="邮箱"
                             width="180">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="电话"
                             width="180">
            </el-table-column>
            <el-table-column prop="role_name"
                             label="角色"
                             width="120">
            </el-table-column>
            <el-table-column prop="mg_state"
                             label="状态"
                             width="80">
              <!-- 自定义表格 -->
              <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state"
                           @change="changeStatus(scope.row)"
                           active-color="#13ce66"
                           inactive-color="#ff4949">
                </el-switch>
              </template>

            </el-table-column>
            <el-table-column prop="create_time"
                             label="创建时间"
                             width="180">
            </el-table-column>
            <!-- 自定义 表单 用template包起来  通过作用域插槽取值 scope.row -->
            <el-table-column prop="operation"
                             label="操作"
                             width="180">
              <template slot-scope="scope">
                <el-row>
                  <el-button type="primary"
                             size="mini"
                             @click="showEditDialog(scope.row.id)"
                             icon="el-icon-edit"
                             circle>
                  </el-button>
                  <el-button type="danger"
                             size="mini"
                             @click="delUser(scope.row.id)"
                             icon="el-icon-delete"
                             circle>
                  </el-button>
                  <el-tooltip class="item"
                              effect="dark"
                              content="设置"
                              placement="right-start">
                    <el-button type="warning"
                               size="mini"
                               icon="el-icon-setting"
                               circle>
                    </el-button>
                  </el-tooltip>

                </el-row>
              </template>

            </el-table-column>

          </el-table>
        </div>
        <!-- 列表结束 -->

      </el-card>
      <!-- 分页开始 -->
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page.currentPage4"
                       :page-sizes="[1, 2, 3, 4]"
                       :page-size="3"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="this.page.total">
        </el-pagination>
      </div>
      <!-- 分页结束 -->
    </div>
    <!-- 列表结束 -->
  </div>

</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      page: {
        total: 0
      },
      centerDialogVisible: false,

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 添加用户的表单数据对象
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ]
      }

    }
  },
  created () {
    this.getList()
  },
  methods: {

    async getList () {
      const { data: res } = await this.$http.get('/users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.tableData = res.data.users
      this.page.total = res.data.total
    },
    // try{
    //   getList () {
    //     return new Promise((resolve, reject) => {
    //       const data = this.$http.get('/users', { params: this.queryInfo })
    //       resolve(data)
    //     }).then((data) => {
    //       console.log(data)
    //     }).catch((err) => { console.log(err) })
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getList()
    },
    async changeStatus (scope) {
      const { data: res } = await this.$http.put(`users/${scope.id}/state/${scope.mg_state}`)
      // console.log(res)
      if (res.meta.status !== 200) {
        // 更新失败时恢复为原始状态
        scope.mg_state = !scope.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    addUser () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        const { data: res } = await this.$http.post('users', this.ruleForm)
        // console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加用户失败')
        }

        // 关闭对话框
        this.centerDialogVisible = false
        // 刷新用户列表
        this.getList()
        // 提示添加成功
        this.$message.success('添加用户成功')
      })
    },
    async showEditDialog (id) {
      const { data: res } = await this.$http.get(`/users/${id}`)
      // console.log(res)
      // this.editForm.username = res.data.username
      if (res.meta.status !== 200) {
        return this.$message.error('查询失败')
      }
      this.editForm = res.data
      this.editDialogVisible = true
      // console.log(this.editForm)
    },
    editUser () {
      this.$refs.editForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        const { data: res } = await this.$http.put(`/users/${this.editForm.id}`, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        // console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('修改用户失败！')
        }
        this.editDialogVisible = false
        this.getList()
        this.$message.success('修改用户成功！')
      })
    },
    // 删除用户
    delUser (id) {
      this.$confirm('删除用户?', '用户删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`/users/${id}`)
        // console.log(res)

        if (res.meta.status !== 200) {
          this.$message.error('删除失败')
        }
        this.getList()
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}

</script>

<style lang='less' scoped>
.wrapper {
  .crumb {
  }
  .card {
    .search {
      border: 1px solid black;
      height: 40px;
      .el-input {
        width: 400px;
      }
    }
  }
}
</style>
