const pendingRequests = new Map()
let nextRequestId = 0

export const isNative = () =>
  typeof window !== 'undefined' && Boolean(window.__VF_NATIVE__?.app)

export const nativeConfig = () =>
  isNative() ? window.__VF_NATIVE__ : null

export function request(type, payload = {}) {
  if (!isNative() || !window.ReactNativeWebView?.postMessage) {
    return Promise.reject(new Error('Native bridge is unavailable'))
  }

  const requestId = `vf-${Date.now()}-${++nextRequestId}`
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(requestId)
      reject(new Error(`Native request timed out: ${type}`))
    }, 15000)

    pendingRequests.set(requestId, { resolve, reject, timeout })
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, requestId, payload }))
  })
}

export function subscribeNativeMessages(onMessage) {
  if (!isNative()) return () => {}

  const listener = (event) => {
    let message
    try {
      message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
    } catch (error) {
      console.error('Could not parse native bridge message', error)
      return
    }
    if (!message || typeof message !== 'object') return

    if (message.requestId && pendingRequests.has(message.requestId)) {
      const pending = pendingRequests.get(message.requestId)
      clearTimeout(pending.timeout)
      pendingRequests.delete(message.requestId)
      if (message.error) pending.reject(new Error(message.error))
      else pending.resolve(message.payload)
      return
    }

    onMessage(message)
  }

  window.addEventListener('message', listener)
  return () => window.removeEventListener('message', listener)
}
