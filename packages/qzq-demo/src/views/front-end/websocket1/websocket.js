// composables/useWebSocket.js
import { ref, onUnmounted, computed } from 'vue'

export function useWebSocket(url, options = {}) {
  const {
    autoReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    heartbeatInterval = 30000,
    onMessage = null,
    onError = null,
  } = options

  const ws = ref(null)
  const status = ref('disconnected') // connecting, connected, disconnecting, disconnected
  const lastMessage = ref(null)
  const reconnectCount = ref(0)
  const error = ref(null)

  let reconnectTimer = null
  let heartbeatTimer = null
  let manualClose = false

  const isConnected = computed(() => status.value === 'connected')

  const connect = () => {
    if (ws.value?.readyState === WebSocket.OPEN || ws.value?.readyState === WebSocket.CONNECTING) {
      // console.log('WebSocket 已连接或正在连接中')
      return
    }

    status.value = 'connecting'
    manualClose = false

    try {
      ws.value = new WebSocket(url)

      ws.value.onopen = () => {
        // console.log('WebSocket 连接成功')
        status.value = 'connected'
        reconnectCount.value = 0
        error.value = null
        startHeartbeat()
      }

      ws.value.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          lastMessage.value = data
          if (onMessage) onMessage(data)
        } catch (error) {
          console.error('消息解析失败:', error)
          lastMessage.value = event.data
        }
      }

      ws.value.onclose = (event) => {
        // console.log('WebSocket 连接关闭:', event.code, event.reason)
        status.value = 'disconnected'
        stopHeartbeat()

        if (!manualClose && autoReconnect && reconnectCount.value < maxReconnectAttempts) {
          reconnectTimer = setTimeout(() => {
            reconnectCount.value++
            // console.log(`尝试重连 (${reconnectCount.value}/${maxReconnectAttempts})`)
            connect()
          }, reconnectInterval)
        }
      }

      ws.value.onerror = (event) => {
        console.error('WebSocket 错误:', event)
        error.value = event
        if (onError) onError(event)
      }
    } catch (err) {
      console.error('创建 WebSocket 失败:', err)
      error.value = err
      status.value = 'disconnected'
    }
  }

  const startHeartbeat = () => {
    heartbeatTimer = setInterval(() => {
      if (ws.value?.readyState === WebSocket.OPEN) {
        send({ type: 'ping' })
      }
    }, heartbeatInterval)
  }

  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  const send = (data) => {
    if (ws.value?.readyState === WebSocket.OPEN) {
      const message = typeof data === 'string' ? data : JSON.stringify(data)
      ws.value.send(message)
      return true
    } else {
      console.warn('WebSocket 未连接，无法发送消息')
      return false
    }
  }

  const close = () => {
    manualClose = true
    stopHeartbeat()
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    if (ws.value) {
      ws.value.close(1000, '正常关闭')
      ws.value = null
    }
    status.value = 'disconnected'
  }

  // 自动连接
  connect()

  // 组件卸载时关闭连接
  onUnmounted(() => {
    close()
  })

  return {
    ws,
    status,
    isConnected,
    lastMessage,
    error,
    reconnectCount,
    send,
    close,
    connect,
  }
}
