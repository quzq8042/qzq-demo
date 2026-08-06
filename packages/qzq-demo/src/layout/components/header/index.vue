<template>
  <header class="app-header">
    <div class="header-left">
      <div class="logo" @click="handleLogoClick">
        <img src="./logo.webp" alt="logo" />
      </div>
      <nav class="header-nav">
        <router-link v-for="route in navRoutes" :key="route.path" :to="route.path" class="nav-item" active-class="active">
          {{ route.meta.title }}
        </router-link>
      </nav>
    </div>
    <div class="header-right">
      <time-picker class="time-picker"></time-picker>
      <el-button class="logout-btn" text @click="handleLogout">
        <el-icon class="logout-icon"><SwitchButton /></el-icon>
        <span>退出登录</span>
      </el-button>
    </div>
  </header>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons-vue'
import TimePicker from '@/components/TimePicker/index.vue'
import useUserStore from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import { decrypt } from '@/utils/jsencrypt'
const router = useRouter()

const navRoutes = computed(() => {
  const token = getToken()
  const isQz = token ? decrypt(token) === import.meta.env.VITE_APP_LOGINNAME_ADMIN : false

  return router.options.routes
    .flatMap((route) => {
      if (route.children && route.children.length > 0) {
        return route.children.filter((child) => {
          if (child.hidden) {
            return false
          }
          if (!isQz && child.meta?.requireQz) {
            return false
          }
          return true
        })
      }
      if (route.hidden) {
        return []
      }
      if (!isQz && route.meta?.requireQz) {
        return []
      }
      return [route]
    })
    .filter((route) => route.meta && route.meta.title)
})
import { ElMessage, ElMessageBox } from 'element-plus'
const handleLogout = () => {
  ElMessageBox.confirm('<div class="logout-dialog-content"><div class="logout-icon-circle">🚪</div><p class="logout-text">您确定要退出当前登录吗？</p><p class="logout-subtext">退出后需要重新登录才能使用系统</p></div>', '退出登录', {
    confirmButtonText: '确认退出',
    cancelButtonText: '取消',
    customClass: 'custom-message-box custom-logout-box',
    dangerouslyUseHTMLString: true,
    center: true,
    type: 'warning',
  })
    .then(() => {
      useUserStore()
        .logOut()
        .then(() => {
          router.push({ path: '/' })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
const handleLogoClick = () => {
  router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-left {
  display: flex;
  align-items: center;
}
.logo {
  width: 32px;
  height: 32px;
  margin-right: 16px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.header-nav {
  height: 100%;
  line-height: var(--header-height);
  display: flex;
  gap: 10px;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    border-bottom: 2px solid #ffffff;
  }

  &.active {
    border-bottom: 2px solid #ffffff;

    font-weight: bold;
  }
}
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 退出登录按钮美化 */
.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 25px;
  color: #fff !important;
  font-size: 14px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  transition: all 0.3s ease;
  letter-spacing: 1px;

  .logout-icon {
    font-size: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.28) !important;
    border-color: rgba(255, 255, 255, 0.5) !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
