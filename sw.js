// Files to cache
const cacheName = "turtles-v0";
const files = [
  "/assets/icons/icon-16x16.png",
  "/assets/icons/icon-32x32.png",
  "/assets/icons/icon-96x96.png",
  "/assets/icons/icon-120x120.png",

  "/assets/sounds/BGM.mp3",
  "/assets/sounds/Menu.mp3",
  "/assets/sounds/SFX_1.mp3",
  "/assets/sounds/SFX_2.mp3",
  "/assets/sounds/SFX_3.mp3",
  "/assets/sounds/SFX_4.mp3",
  "/assets/sounds/SFX_5.mp3",
  "/assets/sounds/SFX_6.mp3",

  "/assets/sprites/Braconnier_1.png",
  "/assets/sprites/Braconnier_2.png",
  "/assets/sprites/Braconnier_3.png",
  "/assets/sprites/Braconnier_4.png",
  "/assets/sprites/Flame_1.png",
  "/assets/sprites/Flame_2.png",
  "/assets/sprites/Flame_3.png",
  "/assets/sprites/Flame_4.png",
  "/assets/sprites/Flame_5.png",
  "/assets/sprites/Flame_6.png",
  "/assets/sprites/Police_1.png",
  "/assets/sprites/Police_2.png",
  "/assets/sprites/Seashepherd_1.png",
  "/assets/sprites/Seashepherd_2.png",
  "/assets/sprites/Tortue_1.png",
  "/assets/sprites/Tortue_2.png",
  "/assets/sprites/Tortue_3.png",
  "/assets/sprites/Tortue_4.png",
  "/assets/sprites/Tortue_dos_1.png",
  "/assets/sprites/Tortue_dos_2.png",

  "/assets/background-1.png",
  "/assets/BaksoSapi.otf",
  "/assets/Chemin_texture.png",

  "/src/controller/AudioController.mjs",
  "/src/controller/GameController.mjs",
  "/src/controller/ImageController.mjs",
  "/src/controller/UIController.mjs",

  "/src/datas/animations.js",
  "/src/datas/levels.js",
  "/src/datas/sounds.js",

  "/src/model/Campfire.mjs",
  "/src/model/Enemy.mjs",
  "/src/model/Entity.mjs",
  "/src/model/Level.mjs",
  "/src/model/Road.mjs",
  "/src/model/Spot.mjs",
  "/src/model/Tower.mjs",
  "/src/model/TowerWithTarget.mjs",
  "/src/model/Turtle.mjs",
  "/src/model/Wave.mjs",

  "/src/main.js",

  "/style/credits.css",
  "/style/game.css",
  "/style/hud.css",
  "/style/levelSelection.css",
  "/style/menu.css",
  "/style/settings.css",
  "/style/style.css",
  "/style/variables.css",

  "/favicon.ico",
  "/index.html",
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.warn("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.warn("[Service Worker] Caching all files");
      await cache.addAll(files);
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
      console.warn(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
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
