<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { $pattern, $ux } from '@/common'

interface Params {
  phone: string
  code: string
  password: string
  confirmPassword: string
}

const router = useRouter()
const form = ref()
const active = ref(0)
const params = reactive({}) as Partial<Params>
const onGetCode = () => {
  console.log('onGetCode')
}

const onSubmit = () => {
  form.value.validate((valid: boolean) => {
    if (!valid) return
    if (active.value === 0) {
      active.value++
    } else if (active.value === 1) {
      if (params.confirmPassword !== params.password) {
        $ux.message('error', '两次密码输入不一致')
        return
      }
      active.value++
    } else {
      router.replace({
        path: '/login'
      })
    }
  })
}
</script>

<template>
  <div class="forget-secret">
    <div class="title">找回密码</div>
    <el-steps :active="active" align-center>
      <el-step title="手机号验证">
      </el-step>
      <el-step title="设置新密码"></el-step>
      <el-step title="设置成功"></el-step>
    </el-steps>
      <el-form :model="params" ref="form" :inline="false" size="normal">
        <template v-if="active === 0">
          <el-form-item
            prop="phone"
            :rules="[
              { required: true, message: '请输入手机号' },
              { pattern: $pattern.phone, message: '手机号输入不正确' }
            ]"
          >
            <el-input v-model="params.phone" placeholder="请输入手机号">
              <template #append>
                <el-button type="primary" @click="onGetCode">获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            prop="code"
            :rules="[
              { required: true, message: '请输入验证码' }
            ]"
          >
            <el-input v-model="params.code" placeholder="请输入验证码"></el-input>
          </el-form-item>
        </template>
        <template v-if="active === 1">
          <el-form-item
            prop="password"
            :rules="[
              { required: true, message: '请输入新密码' }
            ]"
          >
            <el-input v-model="params.password" type="password" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item
            prop="confirmPassword"
            :rules="[
              { required: true, message: '确认新密码' }
            ]"
          >
            <el-input v-model="params.confirmPassword" type="password" placeholder="请输入确认新密码"></el-input>
          </el-form-item>
        </template>
        <template v-if="active === 2">
          <el-alert
            title="设置成功"
            type="success"
            description="密码修改成功，点击完成重新登录"
            show-icon
            :closable="false"
          ></el-alert>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{active !== 2 ? '下一步' : '完成'}}</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<style lang="scss" scoped>
.forget-secret {
  min-width: 600px;
  min-height: 400px;
  background-color: #fff;
  .title {
    padding: 30px 50px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .el-form {
    padding: 40px 75px;
    .el-form-item {
      &:last-child {
        .el-button {
          width: 100%;
        }
      }
    }
  }
  .el-alert {
    margin: 0 0 30px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  :deep {
    .el-step__title {
      white-space: nowrap;
    }
  }
}
</style>
