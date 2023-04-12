<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //设置token过期，一段时间后自动删除
    window.addEventListener("beforeunload", () => {
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("menu");
        localStorage.removeItem("userInfo");
      }, 1000 * 60);
    });
  },
};
</script>

<style>
#app {
  touch-action: none;
}
</style>
