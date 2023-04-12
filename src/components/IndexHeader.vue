<template>
  <!-- 主页头部 -->
  <div class="header-container">
    <!-- 左部分内容 -->
    <div class="left">
      <el-button icon="el-icon-menu" size="mini" @click="collapse"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in menuHistory"
          :key="item[2]"
          :to="{ path: item[1] }"
          class="item"
          >{{ item[0] }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- 右部分内容 -->
    <div class="right">
      <!-- 右侧用户头像一个下拉菜单 -->
      <el-dropdown trigger="click" @command="handleClick">
        <el-image
          :src="require('../assets/images/picture.jpg')"
          class="head-image"
        ></el-image>
        <!-- 下拉菜单 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="openDrawer">个人中心</el-dropdown-item>
          <el-dropdown-item command="loginout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "IndexHeader",
  data() {
    return {};
  },
  methods: {
    ...mapMutations("menu", {
      //改变菜单折叠状态
      collapse: "CHANGE_COLLAPSE_STATUS",
    }),
    //退出登陆
    handleClick(command) {
      if (command == "loginout") {
        //删除token
        localStorage.removeItem("token");
        //删除用户菜单数据
        localStorage.removeItem("menu");
        //删除用户数据
        localStorage.removeItem("userInfo");
        //重定向回登陆界面
        this.$router.replace({
          name: "login",
        });
      } else {
        this.$store.commit("home/OPEN_DRAWER");
      }
    },
  },
  computed: {
    //获取菜单点击的历史记录
    ...mapState("menu", ["menuHistory"]),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  height: 60px;
  background: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-breadcrumb {
      margin-left: 14px;
      font-size: 14px;
      .item /deep/ .el-breadcrumb__inner {
        color: #b7b4bc;
      }
    }
  }
}
.head-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>
