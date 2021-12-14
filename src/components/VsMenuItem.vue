<script lang="ts" setup>
import type { VsMenu } from '~/components'

defineProps<{
  items?: Array<VsMenu.Item>
}>()
</script>

<template>
  <template v-for="item in items" :key="item.path">
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length">
      <template #title>
        <i v-if="item.icon" :class="['el-icon', 'iconfont', item.icon]"></i>
        <span>{{item.name}}</span>
      </template>
      <VsMenuItem :items="item.children" />
    </el-sub-menu>
    <el-menu-item :index="item.path" v-else>
      <i v-if="item.icon" :class="['el-icon', 'iconfont', item.icon]"></i>
      <template #title>
        <span>{{item.name}}</span>
      </template>
    </el-menu-item>
  </template>
</template>
