<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const isCollapse = computed({
  get: () => props.modelValue,
  set: val => val
})

const onCollapseBtn = () => {
  emit('update:modelValue', !isCollapse.value)
}
</script>

<template>
  <div class="vs-header">
    <div class="bar-left">
      <svg
        :class="{'is-collapse': !isCollapse}"
        class="collapse-btn"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        @click="onCollapseBtn"
      >
        <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
      </svg>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bar-right">
      <div class="login-user">
        <el-popover
          placement="bottom"
          trigger="hover"
          width="auto"
        >
          <template #reference>
            <div>
              <i class="iconfont icon-user-circle"></i>
              <span class="text">wuhandata</span>
              <i class="iconfont icon-angle-down"></i>
            </div>
          </template>
          <el-button size="small">退出</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  .el-button {
    font-size: 22px;
    padding: 10px;
    border: 0 none;
    background-color: transparent;
  }
  .bar-left {
    display: inline-flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 15px;
    }
    .collapse-btn {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      cursor: pointer;
      &.is-collapse {
        transform: rotate(180deg);
      }
    }
  }
  .bar-right {
    display: inline-flex;
    align-items: center;
    .login-user {
      display: inline-flex;
      align-items: center;
      position: relative;
      font-size: 14px;
      cursor: pointer;
      padding-left: 15px;
      margin-left: 8px;
      .icon-user-circle {
        font-size: 16px;
      }
      .icon-angle-down {
        font-size: 10px;
        margin-bottom: -3px;
      }
      .text {
        margin: 0 8px;
      }
    }
  }
}
</style>
