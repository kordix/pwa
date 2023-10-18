const CACHE_NAME = 'my-pwa-cache-v5';
const urlsToCache = [
    '/',
    '/index.html',
    '/icon.png'
];

self.addEventListener('install', event => {
    console.log('install z service worker');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    console.log('activate z service worker');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('fetch z service worker');
    const requestUrl = new URL(event.request.url);

    // Wyklucz z cachowania endpoint '/api/read2.php'
    if (requestUrl.pathname === '/api/read2.php') {
        return fetch(event.request);
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseToCache));

                        return response;
                    });
            })
            .catch(() => {
                // Obsługa błędów, np. wyświetlenie strony offline
                return caches.match('/offline.html');
            })
    );
});


function checkForUpdate() {
    console.log('check for update service worker');

}


self.addEventListener('message', event => {
    console.log('message');
    clearCache();
    self.registration.unregister()
        .then(() => {
            console.log('odpala ta kopera service worker');
            // Reload the page to apply the update
           
        });
});


function clearCache() {
    console.log('clearcache');
    caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cacheName => {
                return caches.delete(cacheName);
            })
        );
    });
}