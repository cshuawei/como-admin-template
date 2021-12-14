<script lang="ts" setup>
import logo from '@/assets/img/logo.png'

withDefaults(defineProps<{
  icon?: string
  name?: string
  isCollapse?: boolean
}>(), {
  icon: logo
})
</script>

<template>
  <div class="vs-logo">
    <el-image :src="icon" fit="contain" :lazy="true"></el-image>
    <span class="text" v-show="!isCollapse">{{name || '管理平台'}}</span>
  </div>
</template>

<style lang="scss" scoped>
.vs-logo {
  display: flex;
  align-items: center;
  height: 55px;
  color: #003680;
  padding: 0 20px;
  background-color: #fff;
  .el-image {
    flex: 0 0 27px;
    margin-right: 15px;
  }
  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    font-weight: 500;
    flex: 0 0 calc(100% - 27px);
  }
}
</style>
