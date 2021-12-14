<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import loginImg from '@/assets/img/login_img.png'
import vertifyCodeImg from '@/assets/img/vertify_code_img.png'

interface Params {
  username: string
  password: string
  code: string
}

const router = useRouter()
const form = ref() as Ref<any>
const remember = ref(true)
const params = reactive({}) as Params
const onSubmit = () => {
  form.value.validate((valid: boolean) => {
    if (valid) {
      console.log(params)
    }
  })
}

const onForgetSecret = () => {
  router.push({
    path: '/forgetSecret'
  })
}

const onVertifyCodeImg = () => {
  console.log('onVertifyCodeImg')
}
</script>

<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :offset="0">
        <div class="title">后管平台</div>
        <div class="img">
          <el-image :src="loginImg" fit="contain" :lazy="true"></el-image>
        </div>
      </el-col>
      <el-col :span="12" :offset="0">
        <div class="title">登录</div>
        <el-form :model="params" ref="form" :inline="false" size="normal">
          <el-form-item
            prop="username"
            :rules="[
              { required: true, message: '请输入用户名' }
            ]"
          >
            <el-input v-model="params.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="[
              { required: true, message: '请输入密码' }
            ]"
          >
            <el-input v-model="params.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item
            prop="code"
            :rules="[
              { required: true, message: '请输入验证码' }
            ]"
          >
            <el-input v-model="params.code" placeholder="请输入验证码">
              <template #suffix>
                <el-image class="vertify" :src="vertifyCodeImg" fit="contain" :lazy="true" @click="onVertifyCodeImg"></el-image>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="onSubmit">登录</el-button>
            <div class="remember">
              <el-checkbox v-model="remember" label="记住密码" />
              <a @click="onForgetSecret">忘记密码？</a>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 900px;
  background: linear-gradient(225deg,#1ec2ff,#2181f4);
  box-shadow: 0 0 30px 0 rgb(7 39 111 / 50%);
  border-radius: 4px;
  display: flex;
  .el-row {
    flex: 1;
    .el-col {
      &:nth-child(1) {
        .img {
          text-align: right;
          .el-image {
            margin-bottom: -80px;
          }
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          color: #fff;
          padding: 35px 0 0 50px;
          text-shadow: 0 0 30px rgb(0 92 218 / 50%);
          letter-spacing: 6px;
        }
      }
      &:nth-child(2) {
        background-color: #fff;
        .title {
          color: #333;
          font-size: 20px;
          font-weight: bold;
          border-left: 4px solid #3471f6;
          padding: 0 12px;
          margin: 25px 0;
        }
        .el-form {
          padding: 20px 30px;
        }
      }
    }
  }
  .el-form-item {
    .el-button {
      width: 100%;
      min-height: 42px;
      font-weight: bold;
      font-size: 16px;
    }
    &:last-child {
      padding: 10px 0;
    }
  }
  .el-image.vertify {
    padding: 5px;
    cursor: pointer;
  }
  .remember {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
