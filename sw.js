const CACHE_NAME = 'smg-v1';
const urlsToCache = [
  './',
  './index.html',
  './Servicios.html',
  './Horarios.html',
  './manifest.json'
];

// Instalación del Service Worker - OFFLINE FIRST
self.addEventListener('install', event => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cache abierto, guardando recursos...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Todos los recursos en cache');
        return self.skipWaiting(); // Activa el SW inmediatamente
      })
  );
});

// Activación y limpieza de caches antiguas
self.addEventListener('activate', event => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[SW] Service Worker activado');
      return self.clients.claim(); // Toma control de todas las páginas
    })
  );
});

// Estrategia: CACHE FIRST (OFFLINE FIRST) - fallback a Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Si está en cache, devuélvelo inmediatamente (OFFLINE FIRST)
        if (cachedResponse) {
          console.log('[SW] Sirviendo desde cache:', event.request.url);
          
          // Actualiza el cache en segundo plano (stale-while-revalidate)
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, response.clone());
                });
              }
            })
            .catch(() => {
              // Ignorar errores de red en actualización de cache
            });
          
          return cachedResponse;
        }
        
        // Si NO está en cache, intenta obtenerlo de la red
        console.log('[SW] No está en cache, obteniendo de red:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Si la respuesta es válida, guárdala en cache para el futuro
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch(error => {
            console.log('[SW] Error de red:', error);
            // Si falla la red y no está en cache, muestra mensaje offline
            return new Response(
              '<!DOCTYPE html><html><head><title>Sin conexión</title></head><body style="font-family: Arial; text-align: center; padding: 50px;"><h1>Sin conexión</h1><p>Esta página no está disponible offline.</p></body></html>',
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/html'
                })
              }
            );
          });
      })
  );
});
