'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useUser } from '@/Contexts/UserContext'
import { getJWT } from '@/Secrets'
import {
  isNative,
  nativeConfig,
  request,
  subscribeNativeMessages,
} from '@/lib/nativeBridge'

const dispatch = (name, detail = {}) => {
  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export default function NativeBridgeMount() {
  const context = useUser()
  const user = context?.user
  const loading = context?.loading
  const userId = user?.id
  const native = isNative()
  const token = native ? getJWT() : null
  const config = nativeConfig()

  useEffect(() => {
    if (!native || loading) return undefined

    let socket
    const subscriptions = subscribeNativeMessages((message) => {
      const payload = message.payload || {}
      switch (message.type) {
        case 'NOTIFICATION_NEW':
          dispatch('vf:notification', payload)
          break
        case 'NOTIFICATION_RECEIVED':
          dispatch('vf:notification', payload)
          break
        case 'NOTIFICATION_TAPPED':
          dispatch('vf:notification-tapped', payload)
          break
        case 'NAVIGATE_TO':
          if (typeof (payload.url || payload.data?.route || payload.route) === 'string') {
            try {
              const target = new URL(payload.url || payload.data?.route || payload.route, window.location.origin)
              if (target.origin === window.location.origin) window.location.assign(target.href)
            } catch (error) {
              console.error('Rejected invalid native navigation URL', error)
            }
          }
          break
        case 'APP_RESUMED':
          dispatch('vf:refresh', payload)
          break
        case 'SESSION_REPLACED':
          request('STOP_SERVICES')
            .catch((error) => console.error('Could not stop native services after session replacement', error))
            .finally(() => {
              localStorage.removeItem('jwt')
              window.location.assign('/signin')
            })
          break
        case 'SOCKET_CONNECTED':
        case 'SOCKET_DISCONNECTED':
          dispatch(`vf:${message.type.toLowerCase().replaceAll('_', '-')}`, payload)
          break
        default:
          break
      }
    })

    const start = async () => {
      if (!userId || !token) {
        await request('STOP_SERVICES')
        return
      }

      await request('INITIALIZE_SERVICES', {
        userId,
        authToken: token,
        socketServerUrl: config?.deviceSocketUrl,
      })

      const socketUrl = config?.socketUrl || process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000'
      socket = io(socketUrl, { auth: { token }, transports: ['websocket', 'polling'] })
      socket.on('connect', () => {
        socket.emit('join_user_room', userId, (result) => {
          if (!result?.ok) console.error('Could not join realtime user room', result?.message)
        })
      })
      ;['loan:created', 'loan:status', 'document:signed'].forEach((event) => {
        socket.on(event, (payload) => {
          dispatch('vf:refresh', { event, ...payload })
        })
      })
      socket.on('connect_error', (error) => console.error('Realtime socket connection failed', error))
    }

    start().catch((error) => {
      console.error('Could not initialize native services', error)
      dispatch('vf:native-error', { message: error.message })
    })

    return () => {
      subscriptions()
      if (socket?.connected) socket.emit('leave_user_room', userId)
      socket?.disconnect()
    }
  }, [config?.deviceSocketUrl, config?.socketUrl, loading, native, token, userId])

  return null
}
