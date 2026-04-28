<!-- App.vue 或任意组件 -->
<template>
  <div class="websocket-demo">
    <div class="status-bar">
      <div class="status">
        连接状态:
        <span :class="statusClass">{{ statusText }}</span>
      </div>
      <div class="actions">
        <button v-if="!isConnected" :disabled="isConnecting" @click="handleConnect">连接</button>
        <button v-else @click="handleDisconnect">断开</button>
        <button @click="clearMessages">清空消息</button>
      </div>
    </div>

    <div class="message-input">
      <input v-model="username" placeholder="用户名" :disabled="!isConnected" />
      <input v-model="inputMessage" placeholder="输入消息" :disabled="!isConnected" @keyup.enter="sendMessage" />
      <button :disabled="!isConnected" @click="sendMessage">发送</button>
    </div>

    <div class="message-list">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.type]">
        <span class="time">{{ formatTime(msg.timestamp) }}</span>
        <span class="content">
          <strong v-if="msg.username">{{ msg.username }}:</strong>
          {{ msg.message || msg.data || msg }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useWebSocket } from './websocket'

// WebSocket 配置
const WS_URL = 'ws://localhost:3002/websocket'

// 使用 WebSocket composable
const { isConnected, status, send, close, connect, lastMessage } = useWebSocket(WS_URL, {
  autoReconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 5,
  heartbeatInterval: 30000,
  onMessage: (data) => {
    // 自动处理接收到的消息
    handleReceivedMessage(data)
  },
  onError: (error) => {
    console.error('连接错误:', error)
    addSystemMessage('连接错误，请检查网络')
  },
})

// 响应式数据
const username = ref('用户' + Math.floor(Math.random() * 1000))
const inputMessage = ref('')
const messages = ref([])

// 状态辅助计算属性
const isConnecting = computed(() => status.value === 'connecting')
const statusText = computed(() => {
  switch (status.value) {
    case 'connected':
      return '已连接'
    case 'connecting':
      return '连接中...'
    case 'disconnected':
      return '未连接'
    default:
      return '未知'
  }
})
const statusClass = computed(() => {
  switch (status.value) {
    case 'connected':
      return 'status-connected'
    case 'connecting':
      return 'status-connecting'
    case 'disconnected':
      return 'status-disconnected'
    default:
      return ''
  }
})

// 处理接收到的消息
const handleReceivedMessage = (data) => {
  // console.log('收到消息:', data)

  switch (data.type) {
    case 'system':
      addSystemMessage(data.message)
      break
    case 'chat':
      addMessage({
        username: data.username,
        message: data.message,
        timestamp: data.timestamp,
        type: 'received',
      })
      break
    case 'pong':
      // console.log('心跳响应')
      break
    case 'heartbeat':
      // 服务器心跳，不需要处理
      break
    case 'echo':
      addMessage({
        message: `回声: ${JSON.stringify(data.data)}`,
        timestamp: data.timestamp,
        type: 'system',
      })
      break
    default:
      addMessage({
        message: JSON.stringify(data),
        timestamp: Date.now(),
        type: 'system',
      })
  }
}

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return

  const messageData = {
    type: 'chat',
    username: username.value,
    message: inputMessage.value,
    timestamp: Date.now(),
  }

  // 发送到服务器
  const success = send(messageData)

  if (success) {
    // 添加到本地消息列表
    addMessage({
      username: username.value,
      message: inputMessage.value,
      timestamp: Date.now(),
      type: 'sent',
    })
    inputMessage.value = ''
  } else {
    addSystemMessage('发送失败，请检查连接状态')
  }
}

// 添加消息到列表
const addMessage = (msg) => {
  messages.value.push({
    ...msg,
    id: Date.now() + Math.random(),
  })
  // 自动滚动到底部
  setTimeout(() => {
    const container = document.querySelector('.message-list')
    if (container) container.scrollTop = container.scrollHeight
  }, 100)
}

// 添加系统消息
const addSystemMessage = (content) => {
  messages.value.push({
    type: 'system',
    message: content,
    timestamp: Date.now(),
    id: Date.now() + Math.random(),
  })
}

// 清空消息
const clearMessages = () => {
  messages.value = []
}

// 手动连接
const handleConnect = () => {
  connect()
}

// 手动断开
const handleDisconnect = () => {
  close()
  addSystemMessage('已手动断开连接')
}

// 格式化时间
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`
}

// 监听连接状态变化
watch(isConnected, (newVal) => {
  if (newVal) {
    addSystemMessage('已连接到服务器')
  } else {
    addSystemMessage('连接已断开')
  }
})
</script>

<style scoped>
.websocket-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.status {
  font-size: 14px;
}

.status-connected {
  color: #4caf50;
  font-weight: bold;
}

.status-connecting {
  color: #ff9800;
  font-weight: bold;
}

.status-disconnected {
  color: #f44336;
  font-weight: bold;
}

.actions button {
  margin-left: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #2196f3;
  color: white;
}

.actions button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.message-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.message-input input:first-child {
  flex: 0.3;
}

.message-input button {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message-input button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.message-list {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background: #fafafa;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
}

.message.sent {
  background: #e3f2fd;
  text-align: right;
}

.message.received {
  background: #f5f5f5;
}

.message.system {
  background: #fff3e0;
  text-align: center;
  font-size: 12px;
  color: #666;
}

.message .time {
  font-size: 11px;
  color: #999;
  margin-right: 8px;
}

.message .content {
  word-break: break-word;
}
</style>
