<template>
  <div class="mall-container">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      class="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Mall",
};
</script>

<style lang="less" scoped>
.mall-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .upload /deep/ .el-upload {
    width: 800px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
