<script lang="ts" setup>
import { reactive } from 'vue'
import type { VsSearchBar } from '~/components'

withDefaults(defineProps<{
  isInquiring?: boolean
  items?: Array<VsSearchBar.Item>
}>(), {
  isInquiring: false
})

const emit = defineEmits<{
  (e: 'on-inquire', val: any): void
  (e: 'on-remote-method', val: VsSearchBar.RemoteMethodData): void
}>()

const params = reactive({}) as any

const onInquire = () => {
  emit('on-inquire', params)
}
const onReset = () => {
  Object.keys(params).forEach((key: string) => {
    delete params[key]
  })
}
const onRemoteMethod = (e: VsSearchBar.RemoteMethodData) => {
  emit('on-remote-method', { key: e.key, value: e.value })
}

defineExpose({
  onReset
})
</script>

<template>
  <div class="vs-search-bar">
    <el-row :gutter="10">
      <el-col v-for="item in items" :key="item.type">
        <template v-if="item.type === 'input'">
          <el-input
            v-model="params[item.key]"
            :placeholder="item.placeholder"
            size="small"
            clearable
          />
        </template>
        <template v-if="item.type === 'select'">
          <el-select
            v-model="params[item.key]"
            clearable
            :placeholder="item.placeholder"
            size="small"
          >
            <el-option
              v-for="d in item.data"
              :key="d.value"
              :label="d.label"
              :value="d.value"
            ></el-option>
          </el-select>
        </template>
        <template v-if="item.type === 'select-remote'">
          <el-select
            v-model="params[item.key]"
            clearable
            filterable
            remote
            reserve-keyword
            size="small"
            :placeholder="item.placeholder"
            :remote-method="($event: string) => onRemoteMethod({ key: item.key, value: $event })"
          >
            <el-option
              v-for="d in item.data"
              :key="d.value"
              :label="d.label"
              :value="d.value"
            ></el-option>
          </el-select>
        </template>
        <template v-if="item.type === 'cascader'">
          <el-cascader
            v-model="params[item.key]"
            clearable
            :placeholder="item.placeholder"
            :options="item.data"
            size="small"
            :props="{ checkStrictly: true }"
          ></el-cascader>
        </template>
        <template v-if="item.type === 'daterange'">
          <el-date-picker
            v-model="params[item.key]"
            type="daterange"
            clearable
            size="small"
            range-separator="~"
            value-format="YYYY-MM-DD"
            :start-placeholder="`${item.placeholder}开始日期`"
            :end-placeholder="`${item.placeholder}结束日期`"
          ></el-date-picker>
        </template>
      </el-col>
      <el-col>
        <el-button type="primary" size="small" :loading="isInquiring" @click="onInquire">
          查询
        </el-button>
        <el-button plain size="small" @click="onReset">重置</el-button>
        <slot name="button-expand"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.vs-search-bar {
  .el-col-24 {
    flex: 0 0 auto;
    margin-bottom: 10px;
  }
  .el-button + .el-button {
    margin-bottom: 10px;
  }
}
</style>
