// ═══════════════════════════════════════════════════════════════════════════
// Service worker AUTO-DESTRUCTEUR (Sprint 100)
// Remplace l'ancien flutter_service_worker.js qui servait un cache obsolète
// (ancien app.html/main.dart.js) malgré les nouveaux déploiements.
// Les navigateurs ayant encore l'ancien SW vont, à la prochaine vérif de mise à
// jour, récupérer CE script → il vide tous les caches, se désenregistre, puis
// recharge les onglets ouverts → la dernière version est servie, sans hard-refresh.
// (On reste en --pwa-strategy=none : aucun nouveau SW de cache n'est enregistré.)
// ═══════════════════════════════════════════════════════════════════════════
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    } catch (e) { /* ignore */ }
    try { await self.registration.unregister(); } catch (e) { /* ignore */ }
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function (c) { c.navigate(c.url); });
    } catch (e) { /* ignore */ }
  })());
});
