var cacheName = 'game-pwa'; 
var filesToCache = [
  '/css/2048.css',
  '/js/bind_polyfill.js',
  '/js/classlist_polyfill.js',
  '/js/animframe_polyfill.js',
  '/js/keyboard_input_manager.js',
  '/js/html_actuator.js',
  '/js/grid.js',
  '/js/tile.js',
  '/js/local_storage_manager.js',
  '/js/game_manager.js',
  '/js/application.js'
];
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});
/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});