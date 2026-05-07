const CACHE_NAME = 'futarena-pwa-v1';
const DYNAMIC_CACHE_NAME = 'futarena-dynamic-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/data-service.js',
  '/narration.js',
  '/patch_narration.js',
  '/data/teams.json',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-maskable.svg'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching App Shell');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  // Ignore requests that aren't GET or not from our origin
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For data and dynamic requests, use Network First, fallback to Cache
  if (url.pathname.includes('/data/') || url.pathname.includes('.json')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // For static assets, use Cache First, fallback to Network
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Fallback for offline if not in cache
            if (event.request.mode === 'navigate') {
               // We could return a specific offline page if we had one
               // return caches.match('/offline.html');
            }
          });
      })
    );
  }
});
