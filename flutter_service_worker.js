'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "c17fdeb6a4f88487158cd16cce413361",
"sitemap.xml": "fbf54d1bd9559b098ca3dbb137a37845",
"icons/Icon-maskable-192.png": "e3d8b6a5948a2ddc6386319869ef9665",
"icons/Icon-512.png": "4a8aff7d9ddca2e2aeb0b5511507f1b9",
"icons/Icon-maskable-512.png": "4a8aff7d9ddca2e2aeb0b5511507f1b9",
"icons/Icon-loading.png": "55f6dd98b1fec828874edf9c5bbaadee",
"icons/Icon-192.png": "e3d8b6a5948a2ddc6386319869ef9665",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"robots.txt": "fedd3430f7baff53aeedad4f94b18474",
"CNAME": "abef185e7fa9c7c15ca6b2616cf4865f",
"firebase-messaging-sw.js": "bbba4a59624c785dc694bee5d29169ec",
"privacy.html": "3f9a84734a50e48dcde870aae48bf66d",
"terms.html": "743410a0908ae8ad30089f0b8e492110",
".well-known/assetlinks.json": "450ad24194e409ada74f0be5e33378da",
".well-known/apple-app-site-association": "706fd0f9a7711c2a7575012b83455c8d",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"legal.html": "6340ffa213f7630d61a83a8130934c5d",
"app.html": "474084edb0bbec120f4a69ae3c01c102",
"flutter_bootstrap.js": "44faf2ec89619ca43fdad65208363937",
"manifest.json": "d9864016b51d9f19694d340402a4e5e2",
"index.html": "6e892ea8b1ba22b4c22e124cab6e25a7",
"/": "6e892ea8b1ba22b4c22e124cab6e25a7",
"favicon.png": "a4eba85ff9dea4e16f4c5207f2076694",
"main.dart.js": "85ac4c3affb12b32fd0251789d29e757",
"assets/NOTICES": "cb1db9b8b118ab9a2e2f38326cc6cfc0",
"assets/AssetManifest.bin": "74325ada50330ec9d159079f3ff593c8",
"assets/AssetManifest.bin.json": "543cd84918be1ba5a795c06d283a365b",
"assets/FontManifest.json": "ba36a337d309ac2da35e918d81a954cb",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"assets/fonts/MaterialIcons-Regular.otf": "2632aae55ed361755790eb60d2a5b318",
"assets/assets/animations/orb_home.mp4": "15d973172093426f3b46db17db9bfb0e",
"assets/assets/onboarding/sending.mp4": "27593d672217a3f8a8aaa60d1b0bcf97",
"assets/assets/onboarding/welcomeorb.mp4": "4a5decf1cc64d552e1b63fd51e4765f2",
"assets/assets/onboarding/loupe.mp4": "524d03866669333b95ec877b026e1815",
"assets/assets/onboarding/document.mp4": "2ad34029211348b95f40671059f388b4",
"assets/assets/icon/app_icon_transparent.png": "b537662c12ca540ecfeb893c4ef20353",
"assets/assets/icon/app_icon.png": "4a8aff7d9ddca2e2aeb0b5511507f1b9",
"assets/assets/images/orbes/orbe_max.png": "07934518e7d135d4e16d216c3454a97f",
"assets/assets/images/orbes/orbe_decouverte.png": "21b84130e9286aa9e1a04f8855d09c69",
"assets/assets/images/orbes/orbe_protection.png": "e50c54dd07fd1f1eec02ebb49913558f",
"assets/assets/images/orbes/orbe_essentiel.png": "06b2e56350a4638140285a8461591110",
"assets/assets/fonts/Roboto-Regular.ttf": "3e1af3ef546b9e6ecef9f3ba197bf7d2",
"assets/assets/fonts/Roboto-Light.ttf": "fc84e998bc29b297ea20321e4c90b6ed",
"assets/assets/fonts/Roboto-Bold.ttf": "ee7b96fa85d8fdb8c126409326ac2d2b",
"assets/assets/fonts/Roboto-Medium.ttf": "d08840599e05db7345652d3d417574a9"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
