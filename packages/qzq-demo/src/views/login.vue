<template>
  <div class="page-login">
    <div v-for="i in 5" :key="i" :class="`layer${i}`"></div>
    <LoginAnimation ref="animationRef" />
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h2 class="login-title"><img class="logo" src="../assets/images/logo.webp" alt="logo" />工设绘记</h2>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
          @focus="handleUsernameFocus"
          @blur="handleUsernameBlur"
        >
          <template #prefix><svg-icon icon-class="loginuser" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
          @focus="handlePasswordFocus"
          @blur="handlePasswordBlur"
        >
          <template #prefix><svg-icon icon-class="loginpass" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button class="login-btn" :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <Calendar />
  </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import { encrypt, decrypt, rsaEncrypt } from '@/utils/jsencrypt'
import useUserStore from '@/store/modules/user'
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import Calendar from '@/components/Calendar/index.vue'
import LoginAnimation from '@/components/LoginAnimation/index.vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const logins = {
  username: import.meta.env.VITE_APP_LOGINNAME_USER,
  username1: import.meta.env.VITE_APP_LOGINNAME_ADMIN,
  password: import.meta.env.VITE_APP_PASSWORD,
}
const loginForm = ref({
  username: logins.username,
  password: logins.password,
})

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
}

const loading = ref(false)
const animationRef = ref(null)

function handleUsernameFocus() {
  animationRef.value?.handleUsernameFocus()
}

function handleUsernameBlur() {
  animationRef.value?.handleUsernameBlur()
}

function handlePasswordFocus() {
  animationRef.value?.handlePasswordFocus()
}

function handlePasswordBlur() {
  animationRef.value?.handlePasswordBlur()
}

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true

      loginForm.value.username = loginForm.value.username.trim()
      // 调用action的登录方法
      const validUsers = [
        { username: logins.username, password: logins.password },
        { username: logins.username1, password: logins.password },
      ]
      const isValidUser = validUsers.some(
        (user) => user.username === loginForm.value.username && user.password === loginForm.value.password
      )
      if (!isValidUser) {
        ElMessage.error('账号或密码错误')
        loading.value = false
        return
      }
      userStore
        .login({
          ...loginForm.value,
          password: rsaEncrypt(loginForm.value.password),
        })
        .then(() => {
          router.push({ path: '/' })
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}
</script>

<style lang="scss" scoped>
.page-login {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/images/bg.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  overflow: hidden;
}

.login-form {
  position: fixed;
  right: 10vw;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(227, 223, 223, 0.5);
  box-shadow: inset 0px 0px 10px 1px rgba(227, 223, 223, 0.5);
  width: 450px;
  padding: 50px 40px;
  border-radius: 10px;
  z-index: 1;
  .login-title {
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    line-height: 32px;
    text-align: center;
    margin-bottom: 30px;
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgba(135, 206, 250, 0.8), 0 0 20px rgba(135, 206, 250, 0.6), 0 0 30px rgba(135, 206, 250, 0.4),
      0 2px 4px rgba(0, 0, 0, 0.3);
    .logo {
      width: 32px;
      height: 32px;
      margin-right: 8px;
      vertical-align: middle;
      background-color: transparent;
    }
  }
  &:deep(.el-input) {
    height: 48px;
    .el-input__wrapper {
      background-color: transparent;
      // box-shadow: inset 0px 0px 10px 1px #000e11;
      border-radius: 6px 6px 6px 6px;
      border: 1px solid #000e11;
    }

    input {
      height: 48px;
      color: #333333;
    }
    ::placeholder {
      color: #333333;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-btn {
  height: 48px;
  border-radius: 6px 6px 6px 6px;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  line-height: 16px;
  border: none !important;
}
</style>
<style scoped lang="scss">
@use 'sass:math';
@function star($n) {
  $result: '#{random(100)}vw #{random(100)}vh 0 #fff';
  @for $i from 2 through $n {
    $result: '#{$result}, #{random(100)}vw #{random(100)}vh 0 #fff';
  }
  @return unquote($result);
}
$n: 5;
$duration: 400s;
$count: 1000;
@for $i from 1 through $n {
  $duration: floor(math.div($duration, 2));
  $count: floor(math.div($count, 2));
  .layer#{$i} {
    position: fixed;
    top: 0;
    left: 0;
    width: #{$i}px;
    height: #{$i}px;
    border-radius: 50%;
    box-shadow: star($count);
    animation: moveup #{$duration} linear infinite;
    &::after {
      content: '';
      position: inherit;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      box-shadow: inherit;
      left: 0;
      top: 100vh;
    }
  }
}

@keyframes moveup {
  to {
    transform: translateY(-100vh);
  }
}
</style>
