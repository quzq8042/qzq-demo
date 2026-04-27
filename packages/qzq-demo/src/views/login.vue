<template>
  <div class="page-login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h2 class="login-title">用户登录</h2>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
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
  </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import { encrypt, decrypt, rsaEncrypt } from '@/utils/jsencrypt'
import useUserStore from '@/store/modules/user'
import { ref, onMounted, onUnmounted } from 'vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false,
})

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
}

const loading = ref(false)
const redirect = ref(undefined)

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect
  },
  { immediate: true }
)

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, { expires: 30 })
        Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set('rememberMe', loginForm.value.rememberMe, { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      // 调用action的登录方法
      userStore
        .login({
          ...loginForm.value,
          password: rsaEncrypt(loginForm.value.password),
        })
        .then(() => {
          const query = route.query
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
              acc[cur] = query[cur]
            }
            return acc
          }, {})
          router.push({ path: redirect.value || '/', query: otherQueryParams })
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}

function getCookie() {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
  }
}

onMounted(() => {
  getCookie()
})
</script>

<style lang="scss" scoped>
.page-login {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url('../assets/images/login.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  overflow: hidden;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    text-align: center;
    margin-bottom: 30px;
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
  line-height: 16px;
  border: none !important;
}
</style>
