const CACHE_NAME = 'calcwise-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/index-ar.html',
    '/about.html',
    '/about-ar.html',
    '/blog.html',
    '/blog-ar.html',
    '/privacy.html',
    '/terms.html',
    '/og-image.png'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/index.html')))
    );
});
