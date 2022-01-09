// Files to cache
const cacheName = "turtles-v0";
const files = [
  "/assets/icons/icon-16x16.png",
  "/assets/icons/icon-32x32.png",
  "/assets/icons/icon-60x60.png",
  "/assets/icons/icon-76x76.png",
  "/assets/icons/icon-120x120.png",
  "/assets/icons/icon-152x152.png",
  "/assets/icons/icon-180x180.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-384x384.png",

  "/assets/background-1.jpg",
  "/assets/BaksoSapi.otf",
  "/assets/sample-9s.mp3",
  "/assets/skyrim-main-theme-w-mp3-link.mp3",

  "/src/controller/AudioController.mjs",
  "/src/controller/GameController.mjs",
  "/src/controller/UIController.mjs",

  "/src/model/Campfire.mjs",
  "/src/model/Enemy.mjs",
  "/src/model/Entity.mjs",
  "/src/model/Level.mjs",
  "/src/model/Road.mjs",
  "/src/model/Spot.mjs",
  "/src/model/Tower.mjs",
  "/src/model/TowerWithTarget.mjs",

  "/src/main.js",

  "/style/credits.css",
  "/style/game.css",
  "/style/hud.css",
  "/style/levelSelection.css",
  "/style/menu.css",
  "/style/settings.css",
  "/style/style.css",
  "/style/variables.css",

  "/index.html",
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.warn("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.warn("[Service Worker] Caching all files");
      //await cache.addAll(files);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      //console.warn(`[Service Worker] Caching new resource: ${e.request.url}`);
      //cache.put(e.request, response.clone());
      return response;
    })()
  );
});

// Remove old cache
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
