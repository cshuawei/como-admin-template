<script lang="ts" setup>
import { reactive } from 'vue'
import type { VsSearchBar as Types } from '~/components'

const props = withDefaults(
  defineProps<{
    isInquiring?: boolean;
    items?: Array<Types.Item>;
  }>(),
  {
    isInquiring: false,
  }
)

const emit = defineEmits<{
  (e: 'on-inquire', val: any): void;
  (e: 'on-remote-method', val: Types.RemoteMethodData): void;
}>()

const params = reactive<Record<string, any>>({})

const onInquire = () => {
  const _params = { ...params }
  const findDaterange = props.items?.find((e) => e.type === 'daterange')
  if (findDaterange && findDaterange.keys && params[findDaterange.key]) {
    _params[findDaterange.keys[0]] = `${params[findDaterange.key][0]} 00:00:00`
    _params[findDaterange.keys[1]] = `${params[findDaterange.key][1]} 23:59:59`
  }
  // 清除多余key
  const keys = props.items?.reduce((p, c) => {
    if (c.keys && c.keys.length) {
      return p ? `${p},${c.key}` : `${c.key}`
    } else {
      return `${p}`
    }
  }, '')
  keys &&
    keys.split(',').forEach((key: string) => {
      delete _params[key]
    })
  emit('on-inquire', _params)
}
const onReset = () => {
  Object.keys(params).forEach((key: string) => {
    delete params[key]
  })
}
const onRemoteMethod = (e: Types.RemoteMethodData) => {
  emit('on-remote-method', { key: e.key, value: e.value })
}

defineExpose({
  onReset,
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
            <template v-if="item.group">
              <el-option-group
                v-for="group in item.data"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="d in group.options"
                  :key="d.value"
                  :label="d.label"
                  :value="d.value"
                ></el-option>
              </el-option-group>
            </template>
            <template v-else>
              <el-option
                v-for="d in item.data"
                :key="d.value"
                :label="d.label"
                :value="d.value"
              ></el-option>
            </template>
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
            <template v-if="item.group">
              <el-option-group
                v-for="group in item.data"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="d in group.options"
                  :key="d.value"
                  :label="d.label"
                  :value="d.value"
                ></el-option>
              </el-option-group>
            </template>
            <template v-else>
              <el-option
                v-for="d in item.data"
                :key="d.value"
                :label="d.label"
                :value="d.value"
              ></el-option>
            </template>
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
            :start-placeholder="item.placeholder && item.placeholder[0]"
            :end-placeholder="item.placeholder && item.placeholder[1]"
          ></el-date-picker>
        </template>
      </el-col>
      <el-col>
        <el-button type="primary" :loading="isInquiring" @click="onInquire">
          查询
        </el-button>
        <el-button @click="onReset">重置</el-button>
        <slot name="button-expand"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.vs-search-bar {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  .el-col-24 {
    flex: 0 0 auto;
    margin-bottom: 10px;
  }
  :deep {
    .el-range-editor--small.el-input__inner {
      width: 280px;
    }
  }
}
</style>
