<script lang="ts" setup>
import VsMenuItem from './VsMenuItem.vue'
import type { VsMenu } from '~/components'

defineProps<{
  items?: Array<VsMenu.Item>
  defaultActive?: string
  isCollapse?: boolean
  router?: boolean
}>()

defineEmits<{
  (event: 'on-select', e: string): void
}>()
</script>

<template>
  <div class="vs-menu">
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      :router="router"
      @select="$emit('on-select', $event)"
    >
      <VsMenuItem :items="items" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.vs-menu {
  padding: 20px 0 20px 30px;
  height: calc(100vh - 90px);
  overflow: auto;
  :deep {
    .el-sub-menu .el-sub-menu__icon-arrow {
      display: inline-flex;
    }
    .el-menu {
      border-right: 0 none;
      background-color: transparent;
    }
    .el-sub-menu__title {
      height: 40px;
      line-height: 40px;
    }
    & > .el-menu {
      & > .el-menu-item {
        &.is-active {
          color: #003680 !important;
          background-color: #fff;
        }
      }
      & > .el-sub-menu {
        &.is-active {
          & > .el-sub-menu__title {
            color: #003680 !important;
            background-color: #fff;
          }
        }
        & > .el-sub-menu__title {
          text-indent: unset;
          color: #fff;
          border-radius: 4px 0 0 4px;
          background-color: transparent;
          &:hover {
            color: #003680;
            background-color: #fff;
          }
        }
      }
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      .el-icon:first-child {
        margin-right: 15px;
      }
    }
    .el-sub-menu {
      &.is-active {
        color: #003680;
      }
      .el-sub-menu__title {
        text-indent: 20px;
        color: #fff;
        background-color: #002B66;
        &:hover {
          background-color: #002252;
        }
      }
      .el-icon:first-child {
        margin-right: 15px;
      }
      .el-menu-item {
        text-indent: 20px;
        background-color: #002B66;
        &:hover {
          background-color: #002252;
        }
        &.is-active {
          background-color: #002252;
          color: #fff;
          &:hover {
            background-color: #001d46;
          }
          &::before {
            position: absolute;
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 8px;
            background: #2165F9;
            border-radius: 50%;
          }
        }
      }
    }
    & > .el-menu > .el-sub-menu, > .el-menu > .el-menu-item {
      color: #fff;
      border-radius: 4px 0 0 4px;
      margin-bottom: 20px;
    }
    & > .el-menu > .el-menu-item {
      &:hover {
        color: #003680;
        background-color: #fff;
      }
    }
    .el-menu--collapse>.el-menu-item .el-sub-menu__icon-arrow, .el-menu--collapse>.el-sub-menu>.el-sub-menu__title .el-sub-menu__icon-arrow {
      display: none;
    }
  }
}
</style>
