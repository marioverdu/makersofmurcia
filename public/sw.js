// Service Worker para PWA de Makers of Murcia
const CACHE_NAME = 'makersofmurcia-v1'
const urlsToCache = [
  '/',
  '/asset/logo.png'
]

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell')
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error('[Service Worker] Cache failed:', error)
      })
  )
  self.skipWaiting()
})

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

// Estrategia de caché: Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonamos y guardamos en caché
        if (response && response.status === 200) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return response
      })
      .catch(() => {
        // Si falla la red, intentamos servir desde caché
        return caches.match(event.request)
      })
  )
})

// 🔔 PUSH NOTIFICATIONS
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received:', event)
  
  let notificationData = {
    title: 'Nueva Reserva',
    body: 'Tienes una nueva reserva pendiente',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'makers-notification',
    requireInteraction: true,
    data: {
      url: '/'
    }
  }

  if (event.data) {
    try {
      const data = event.data.json()
      notificationData = {
        title: data.title || notificationData.title,
        body: data.body || notificationData.body,
        icon: data.icon || notificationData.icon,
        badge: data.badge || notificationData.badge,
        tag: data.tag || notificationData.tag,
        requireInteraction: data.requireInteraction !== undefined ? data.requireInteraction : true,
        data: data.data || notificationData.data,
        actions: data.actions || [],
        vibrate: data.vibrate || [200, 100, 200]
      }
    } catch (error) {
      console.error('[Service Worker] Error parsing push data:', error)
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  )
})

// Click en la notificación
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked:', event)
  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Buscar si ya hay una ventana abierta con la URL
        for (let client of windowClients) {
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus()
          }
        }
        // Si no hay ventana abierta, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
  )
})

// Cerrar notificación
self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notification closed:', event)
})

