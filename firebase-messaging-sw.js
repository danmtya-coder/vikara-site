// firebase-messaging-sw.js
// Ce fichier DOIT être placé dans web/ à la racine

importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyALcAqOR9JG2K_vYeMCvgNuReZtJeX1Jqo",
  authDomain: "hamy-app-2ebf8.firebaseapp.com",
  projectId: "hamy-app-2ebf8",
  storageBucket: "hamy-app-2ebf8.firebasestorage.app",
  messagingSenderId: "1035481670992",
  appId: "1:1035481670992:web:f3548e1d594b58aaf13855"
});

const messaging = firebase.messaging();

// Gestion des messages en arrière-plan
messaging.onBackgroundMessage((payload) => {
  console.log('📬 Message reçu en arrière-plan:', payload);

  const notificationTitle = payload.notification?.title || 'Vikara';
  const notificationOptions = {
    body: payload.notification?.body || 'Vous avez une notification',
    icon: '/icons/Icon-192.png',
    badge: '/icons/Icon-192.png',
    tag: payload.data?.tag || 'vikara-notification',
    data: payload.data,
    // Actions cliquables (optionnel)
    actions: [
      {
        action: 'open',
        title: 'Ouvrir'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Gestion du clic sur la notification
self.addEventListener('notificationclick', (event) => {
  console.log('🖱️ Notification cliquée:', event);
  
  event.notification.close();

  // Ouvrir l'app ou focus si déjà ouverte
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si l'app est déjà ouverte, focus dessus
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // Sinon, ouvrir une nouvelle fenêtre
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});