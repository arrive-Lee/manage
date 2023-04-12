<template>
  <div class="user-container">
    <!-- 添加新用户信息的对话框 -->
    <el-dialog
      :title="isEdit ? '修改用户信息' : '新增用户'"
      :visible.sync="isShow"
      width="40%"
      class="add-info"
      :before-close="cancel"
    >
      <!-- form表单 -->
      <el-form
        :model="form"
        label-width="auto"
        inline
        :rules="rules"
        ref="form"
      >
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item label="年龄" prop="age" label-width="118px">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="gender" label-width="100px">
          <el-select v-model="form.gender" clearable placeholder="请选择">
            <el-option label="男" value="男"> </el-option>
            <el-option label="女" value="女"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 出生日期 -->
        <el-form-item label="出生日期" prop="birthday" label-width="100px">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item label="地址" prop="address" label-width="100px">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sumbit">确认</el-button>
      </div>
    </el-dialog>
    <!-- User表单主体 -->
    <div class="header">
      <div class="left">
        <el-button type="primary" @click="openDialog">+ 新增</el-button>
      </div>
      <div class="right">
        <el-input
          type="text"
          class="search-area"
          placeholder="请输入查找内容"
          v-model.lazy="searchContent"
        ></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="main">
      <!-- 用户数据表格 -->
      <el-table
        :data="userData"
        stripe
        style="width: 100%"
        show-header
        height="650"
      >
        <!-- 姓名 -->
        <el-table-column prop="name" label="姓名" width="auto" fixed>
        </el-table-column>
        <!-- 年龄 -->
        <el-table-column prop="age" label="年龄" width="auto" fixed>
        </el-table-column>
        <!-- 性别 -->
        <el-table-column prop="gender" label="性别" width="auto" fixed>
        </el-table-column>
        <!-- 出生日期 -->
        <el-table-column prop="birthday" label="出生日期" width="auto" fixed>
        </el-table-column>
        <!-- 地址 -->
        <el-table-column prop="address" label="地址" width="auto" fixed>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页工具 -->
    <div class="footer">
      <el-pagination
        background
        layout="prev, pager, next,total,jumper"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        hide-on-single-page
        @next-click="toCurrentPage"
        @pre-click="toCurrentPage"
        @current-change="toCurrentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { getUsersData, createUser, deleteUser, update } from "../api/user";
export default {
  name: "Home",
  data() {
    return {
      isShow: false,
      //表单数据
      form: {
        id: "",
        name: "",
        age: "",
        gender: "",
        birthday: "",
        address: "",
      },
      //表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" },
        ],
        birthday: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "请输入长度为5-30的地址",
            trigger: "blur",
          },
        ],
      },
      // 搜索内容
      searchContent: "",
      // 用户数据
      userData: [],
      //当前页码
      currentPage: 1,
      //用于鉴别编辑与新增状态
      isEdit: false,
      //总的数据条数
      total: 0,
      //每一页的数据数
      pageSize: 20,
    };
  },
  methods: {
    //打开对话框
    openDialog() {
      this.isShow = true;
    },
    //提交数据
    sumbit() {
      if (this.isEdit) {
        this.update();
      } else {
        this.addUser();
      }
    },
    //新增一名用户
    addUser() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.id = nanoid();
          const clone = JSON.parse(JSON.stringify(this.form));
          //发起请求添加用户
          createUser(clone).then((response) => {
            const {
              data: { isSuccess },
            } = response;
            //添加成功
            if (isSuccess) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.getData();
              this.cancel();
            }
          });
        } else {
          this.$message({
            message: "添加失败,输入不合理",
            type: "danger",
          });
        }
      });
    },

    //点击取消
    cancel() {
      this.$refs["form"].resetFields();
      this.isShow = false;
      if (this.isEdit) {
        this.isEdit = false;
      }
    },

    //更新用户数据
    update() {
      //如果数据都合法
      this.$refs["form"].validate((valid) => {
        if (valid) {
          update(this.form).then((response) => {
            const {
              data: { isSuccess },
            } = response;
            if (isSuccess) {
              this.$message({
                message: "更新成功",
                type: "success",
              });
              this.getData();
              this.cancel();
            }
          });
        } else {
          this.$message({
            message: "数据不合理,请重新选择数据",
            type: "danger",
          });
        }
      });
    },

    //处理编辑
    handleEdit(row) {
      this.isEdit = true;
      this.openDialog();
      this.form = JSON.parse(JSON.stringify(row));
    },

    //处理删除
    handleDelete(row) {
      const id = row.id;
      deleteUser(id).then((response) => {
        const {
          data: { isSuccess },
        } = response;
        if (isSuccess) {
          this.getData();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.getData();
          this.$message({
            message: "删除失败",
            type: "success",
          });
        }
      });
    },

    //点击分页工具,跳转页码
    toCurrentPage(page) {
      this.currentPage = page;
      this.getData();
    },

    //获取分页的数据
    getData() {
      getUsersData({
        pageSize: this.pageSize,
        current: this.currentPage,
        info: this.searchContent,
      }).then((response) => {
        const {
          data: { count, userList },
        } = response;
        this.userData = userList;
        this.total = count;
      });
    },

    //查找
    search() {
      this.getData();
    },
  },
  created() {
    //初始化时获取第一页数据
    this.getData();
  },

  watch: {
    searchContent(newVal) {
      if (newVal == "") {
        this.getData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-dialog {
  .el-form {
    height: 200px;
  }
}
.add-info .el-dialog__body {
  padding-bottom: 0;
}
.header {
  display: flex;
  position: relative;
  .right {
    display: flex;
    position: absolute;
    right: 20px;
    .el-input {
      margin-right: 20px;
    }
  }
}

.main {
  height: 650px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
</style>
