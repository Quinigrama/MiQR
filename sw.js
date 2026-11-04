// Service worker: guarda la app en caché para que funcione sin conexión
// y recibe imágenes compartidas desde la galería (Android).
const CACHE = 'lector-qr-v2';
const ARCHIVOS = [
  './',
  './index.html',
  './jsQR.js',
  './qrcode.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE && k !== 'compartido').map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Imagen compartida desde otra app → se guarda en una caché local y se abre la app
  if (e.request.method === 'POST' && url.pathname.endsWith('/index.html')) {
    e.respondWith((async () => {
      try {
        const datos = await e.request.formData();
        const archivo = datos.get('imagen');
        if (archivo) {
          const c = await caches.open('compartido');
          await c.put('./compartido-imagen', new Response(archivo, { headers: { 'Content-Type': archivo.type || 'image/*' } }));
        }
      } catch (err) { /* sin imagen: abrir la app igualmente */ }
      return Response.redirect('./index.html?compartido=1', 303);
    })());
    return;
  }

  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  // Primero caché; si no está, red (y se guarda para la próxima vez)
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((resp) => {
      const copia = resp.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copia));
      return resp;
    }))
  );
});
