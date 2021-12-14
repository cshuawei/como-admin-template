<template>
  <div class="not-found">
    <el-empty description="404，找不到页面"></el-empty>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  :deep {
    .el-empty__description p {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
