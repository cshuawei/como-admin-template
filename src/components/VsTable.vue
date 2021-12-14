<script lang="ts" setup>
import { ref, Ref, reactive, onMounted } from 'vue'
import { $data } from '@/common'
import type { PaginationParams } from '~/common'
import type { VsTable } from '~/components'

withDefaults(defineProps<{
  loading?: boolean
  rowKey?: string
  showSelection?: boolean
  data?: Array<any>
  total?: number
  tableColumns?: Array<VsTable.TableColumn>
}>(), {
  loading: false,
  rowKey: 'id',
  showSelection: false,
  total: 0
})

const emit = defineEmits<{
  (e: 'on-selection-change', val: Array<any>): void
  (e: 'on-paginated', val: PaginationParams): void
}>()

const maxHeight = ref(0)
const selected = ref([]) as Ref<Array<any>>
const params = reactive({
  pageSize: $data.pageSize,
  pageNum: $data.pageNum,
}) as PaginationParams

const getMaxHeight = () => {
  setTimeout(() => {
    const wh = document.documentElement.clientHeight
    const header = document.querySelector('.el-header')
    const headerH = header?.clientHeight || 0

    const navRecords = document.querySelector('.vs-nav-records')
    const navRecordsH = navRecords?.clientHeight || 0

    const searchBar = document.querySelector('.vs-search-bar')
    const searchBarH = searchBar?.clientHeight || 0

    const tabBar = document.querySelector('.el-tabs__header')
    const tabBarH = tabBar?.clientHeight || 0
    // console.log(headerH, navRecordsH, searchBarH, tabBarH)
    maxHeight.value = wh - headerH - navRecordsH - searchBarH - tabBarH - 190
  }, 0)
}

onMounted(() => {
  getMaxHeight()
})

window.addEventListener('resize', () => {
  getMaxHeight()
})

const onSelectionChange = (e: Array<ProxyConstructor>) => {
  selected.value = e
  emit('on-selection-change', e)
}
const handleSizeChange = (e: number) => {
  params.pageSize = e
  emit('on-paginated', params)
}
const handleCurrentChange = (e: number) => {
  params.pageNum = e
  emit('on-paginated', params)
}
</script>

<template>
  <el-table
    ref="table"
    v-loading="loading"
    :data="data"
    :row-key="rowKey"
    size="small"
    :max-height="maxHeight"
    @selection-change="onSelectionChange"
  >
    <el-table-column
      v-if="showSelection"
      fixed="left"
      type="selection"
      width="55"
    />
    <el-table-column
      v-for="item in tableColumns"
      :key="item.property"
      :property="item.property"
      :label="item.label"
      :width="item.width"
      :fixed="item.fixed"
    >
      <template #default="scope">
        <slot name="table-column" :property="item.property" :item="scope.row">
          {{ scope.row[item.property] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :page-sizes="$data.pageSizes"
    :page-size="$data.pageSize"
    :pager-count="$data.pagerCount"
    :layout="$data.pageLayout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
