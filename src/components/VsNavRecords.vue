<script lang="ts" setup>
import { ref, Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import _ from 'lodash'
import type { VsMenu } from '~/components'

const router = useRouter()
const props = defineProps<{
  active?: string
  items?: Array<VsMenu.Item>
}>()

const emit = defineEmits<{
  (e: 'update:active', active: string): void,
  (e: 'update:items', items: Array<VsMenu.Item>): void
}>()

const myItems = ref([]) as Ref<Array<VsMenu.Item>>

const myAvtive = ref() as Ref<string | undefined>

watch(() => props.items, (n) => {
  if (n) myItems.value = n
}, {
  immediate: true
})

watch(() => props.active, (n) => {
  if (n) myAvtive.value = n
}, {
  immediate: true
})

const onClose = (idx: number) => {
  const delItem = myItems.value?.splice(idx, 1)
  const find = _.findLast(myItems.value)
  router.replace({
    path: find?.path || ''
  })
  emit('update:items', myItems.value)
  emit('update:active', find?.path || '')
  return delItem
}

const onItem = (path: string) => {
  if (path === myAvtive.value) return
  emit('update:active', path)
  router.push({
    path
  })
}
</script>

<template>
  <div class="vs-nav-records">
    <el-tag
      v-for="(item, idx) in myItems" :key="item.path"
      :effect="myAvtive === item.path ? 'dark' : 'plain'"
      :closable="item.path !== '/home'"
      @close="onClose(idx)"
      @click="onItem(item.path)"
    >{{item.name}}</el-tag>
  </div>
</template>

<style lang="scss" scoped>
.vs-nav-records {
  height: 30px;
  padding: 15px 20px;
  white-space: nowrap;
  overflow: auto;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
