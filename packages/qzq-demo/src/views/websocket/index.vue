<!-- 前端A: http://localhost:5173 -->
<template>
  <div class="app-a">
    <h2>前端页面B (端口: 3001)</h2>

    <div class="status">
      <div>
        连接状态:
        <span :class="statusClass">{{ statusText }}</span>
      </div>
      <div>客户端ID: {{ clientId }}</div>
      <div>在线人数: {{ onlineCount }}</div>
    </div>

    <div class="message-area">
      <input v-model="targetId" placeholder="目标客户端ID (留空则广播)" type="number" />
      <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="输入消息" />
      <button @click="sendMessage" :disabled="!isConnected">发送消息</button>
    </div>

    <div class="messages">
      <h3>消息记录</h3>
      <div v-for="(msg, idx) in messages" :key="idx" class="message">
        <span class="time">{{ formatTime(msg.timestamp) }}</span>
        <span :class="msg.type">
          {{ msg.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const WS_URL = 'ws://localhost:3003' // 连接中转服务器
const ws = ref(null)
const isConnected = ref(false)
const clientId = ref('')
const onlineCount = ref(0)
const inputMessage = ref('')
const targetId = ref('')
const messages = ref([])

const statusText = computed(() => (isConnected.value ? '已连接' : '未连接'))
const statusClass = computed(() => (isConnected.value ? 'connected' : 'disconnected'))

const addMessage = (text, type = 'received') => {
  messages.value.push({
    text,
    type,
    timestamp: Date.now(),
  })
}

const sendMessage = () => {
  if (!inputMessage.value.trim() || !isConnected.value) return

  const message = {
    type: targetId.value ? 'private' : 'message',
    content: inputMessage.value,
    fromPort: '5173',
    timestamp: Date.now(),
  }

  // 私聊时添加目标ID
  if (targetId.value) {
    message.to = parseInt(targetId.value)
  }

  ws.value.send(JSON.stringify(message))

  // 显示自己发送的消息
  const targetText = targetId.value ? `(发给 ${targetId.value})` : '(广播)'
  addMessage(`[我]${targetText}: ${inputMessage.value}`, 'sent')

  inputMessage.value = ''
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`
}

onMounted(() => {
  ws.value = new WebSocket(WS_URL)

  ws.value.onopen = () => {
    isConnected.value = true
    addMessage('系统: 已连接到服务器', 'system')
  }

  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data)

    switch (data.type) {
      case 'init':
        clientId.value = data.clientId
        addMessage(`系统: 您的客户端ID是 ${data.clientId}`, 'system')
        break

      case 'onlineCount':
        onlineCount.value = data.count
        break

      case 'message':
        addMessage(`[${data.fromPort} 的客户端 ${data.from}]: ${data.content}`, 'received')
        break

      case 'private':
        addMessage(`[私聊 来自 ${data.from}]: ${data.content}`, 'private')
        break

      case 'heartbeat':
        // 心跳包，不处理
        break

      case 'pong':
        console.log('心跳响应')
        break
    }
  }

  ws.value.onclose = () => {
    isConnected.value = false
    addMessage('系统: 连接已断开', 'system')
  }

  ws.value.onerror = (error) => {
    console.error('WebSocket错误:', error)
    addMessage('系统: 连接错误', 'system')
  }
})

onUnmounted(() => {
  if (ws.value) ws.value.close()
})
</script>

<style scoped>
.app-a {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.status {
  background: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.status .connected {
  color: green;
  font-weight: bold;
}
.status .disconnected {
  color: red;
  font-weight: bold;
}

.message-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.message-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message-area input:first-child {
  flex: 0.3;
}

.message-area button {
  padding: 8px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.messages {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  height: 400px;
  overflow-y: auto;
}

.message {
  margin-bottom: 8px;
  padding: 5px;
}

.message .time {
  font-size: 12px;
  color: #999;
  margin-right: 10px;
}

.message .sent {
  color: #007bff;
}

.message .received {
  color: #28a745;
}

.message .private {
  color: #ff9800;
}

.message .system {
  color: #6c757d;
  font-style: italic;
}
</style>
