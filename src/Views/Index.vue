<template>
  <el-container class="contianer">
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      class="drawer"
    >
      <span>我来啦!</span>
    </el-drawer>
    <el-aside width="auto" class="right-content">
      <!-- 侧边导航栏 -->
      <IndexSideMenu></IndexSideMenu>
    </el-aside>
    <el-container class="main">
      <!-- 头部 -->
      <el-header class="header" height="60">
        <IndexHeader></IndexHeader>
      </el-header>
      <div class="tags">
        <el-tag
          v-for="(item, index) in menuHistory"
          :key="item[2]"
          :closable="item[3]"
          size="medium"
          @click="go(item[1])"
          @close="remove(index)"
          :effect="$route.path == item[1] ? 'dark' : 'plain'"
          >{{ item[0] }}</el-tag
        >
      </div>
      <!-- 子路由部分 -->
      <el-main class="content"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import IndexHeader from "../components/IndexHeader.vue";
import IndexSideMenu from "../components/IndexSideMenu.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Index",
  components: {
    IndexSideMenu,
    IndexHeader,
  },
  data() {
    return {};
  },
  methods: {
    //跳转路由
    go(path) {
      if (path != this.$route.path) {
        this.$router.push({
          path: path,
        });
      }
    },
    //删除历史
    ...mapMutations("menu", {
      remove: "REMOVE_HISTORY",
    }),
  },
  computed: {
    ...mapState("menu", ["menuHistory"]),
    ...mapState("home", ["drawer"]),
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
}
.drawer {
  z-index: 1000;
}
.main {
  position: relative;
  .header {
    padding: 0;
  }
  .tags {
    position: absolute;
    top: 75px;
    left: 20px;
    .el-tag {
      cursor: pointer;
      margin: 0 10px;
    }
    .el-tag:first-child {
      margin-left: 0;
    }
    .el-tag:last-child {
      margin-right: 0;
    }
  }
  .content {
    padding-bottom: 0;
    padding-top: 60px;
  }
}
</style>
