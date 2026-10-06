const CACHE_NAME = 'mahjong-calculator-v1';

const CACHE_FILES = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './js/yaku.js',
    './js/fu.js',
    './js/score.js',
    './js/app.js',
    './assets/icons/icon.png'
];


self.addEventListener('install', event => {

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHE_FILES);
            })
    );
});


self.addEventListener('fetch', event => {

    event.respondWith(
        caches
            .match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});