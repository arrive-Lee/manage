<template>
  <!-- 主页侧边菜单 -->
  <el-menu
    router
    :collapse="isCollapse"
    active-text-color="#2C73D2"
    background-color="#545c64"
    text-color="#fff"
    class="side-menu"
  >
    <!-- 判断是否折叠显示不同的文字 -->
    <h3>{{ isCollapse ? "后台" : "后台管理系统" }}</h3>
    <!-- 无二级导航的菜单 -->
    <el-menu-item
      v-for="data in menuWithNo"
      :key="data.name"
      :index="data.path"
      @click="addMenuHistory([data.label, data.path, data.name, true])"
    >
      <i :class="`el-icon-${data.icon}`"></i>
      <span>{{ data.label }}</span>
    </el-menu-item>
    <!-- 有二级导航的菜单 -->
    <el-submenu
      v-for="data in menuWithChildren"
      :key="data.label"
      :index="data.label"
    >
      <!-- 标题 -->
      <template slot="title">
        <i :class="`el-icon-${data.icon}`"></i>
        <span>{{ data.label }}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item-group v-for="sub in data.children" :key="sub.name">
        <!-- 二级菜单选项 -->
        <el-menu-item
          :index="sub.path"
          @click="addMenuHistory([sub.label, sub.path, sub.name, true])"
        >
          <i :class="`el-icon-${sub.icon}`"></i>
          <span>{{ sub.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "SideMenu",
  data() {
    return {
      // 菜单数据
    };
  },
  methods: {
    ...mapActions("menu", ["addMenuHistory"]),
  },
  computed: {
    ...mapState("menu", ["isCollapse", "menu"]),

    //对菜单数据进行持久化
    menuData() {
      return JSON.parse(localStorage.getItem("menu")) || this.menu;
    },
    // 有多级选项的菜单
    menuWithChildren() {
      return this.menuData.filter((item) => item.children);
    },
    // 无多级选项的菜单
    menuWithNo() {
      return this.menuData.filter((item) => !item.children);
    },
  },
};
</script>

<style lang="less" scoped>
.side-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
