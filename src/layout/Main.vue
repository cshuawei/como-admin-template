<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VsLogo, VsHeader, VsMenu, VsNavRecords } from '@/components'
import { $util } from '@/common'
import type { VsMenu as VsMenuTypes } from '~/components'

const route = useRoute()
const defaultActive = ref(route.path)

const menuItems = ref([
  {
    path: '/home',
    name: '首页',
    icon: 'icon-home',
  },
]) as Ref<Array<VsMenuTypes.Item>>

const navRecordsItems = ref([
  {
    path: '/home',
    name: '首页'
  }
]) as Ref<Array<VsMenuTypes.Item>>

const isCollapse = ref(false)

handleNavRecord(defaultActive.value)
const onSelectMenu = (e: string) => {
  defaultActive.value = e
  handleNavRecord(e)
}

onMounted(() => {
  handleCollapse()
})

window.addEventListener('resize', () => {
  handleCollapse()
})

function handleCollapse () {
  const ww = document.documentElement.clientWidth
  if (ww <= 960) isCollapse.value = true
  else isCollapse.value = false
}

function handleNavRecord (path: string) {
  if (navRecordsItems.value.some(v => v.path === path)) return
  const findTreeObj = $util.findTreeObj(path, {
    id: 'path'
  })(menuItems.value)
  if (findTreeObj) {
    navRecordsItems.value.push({
      path,
      name: findTreeObj.name
    })
  }
}
</script>

<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '250px'" :class="{ collapse: isCollapse }">
      <VsLogo
        name="后管平台"
        :isCollapse="isCollapse"
      />
      <VsMenu
        :is-collapse="isCollapse"
        :items="menuItems"
        :router="true"
        :default-active="defaultActive"
        @on-select="onSelectMenu"
      />
    </el-aside>
    <el-container>
      <el-header>
        <VsHeader
          v-model="isCollapse"
        />
      </el-header>
      <VsNavRecords
        v-model:active="defaultActive"
        v-model:items="navRecordsItems"
      />
      <el-main>
        <div class="el-main-cont">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-aside {
  position: relative;
  background-color: #003680;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  will-change: transform;
  transition-property: transform,visibility,width;
  &.collapse {
    .vs-menu {
      padding-left: 0;
    }
  }
}
.el-header {
  height: auto;
  background-color: #F5F8FC;
}
.el-main {
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
  .el-main-cont {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 25px;
    border-radius: 4px;
    background-color: #fff;
  }
}
.el-container.is-vertical {
  height: 100vh;
}
</style>
