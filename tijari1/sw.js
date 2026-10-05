const CACHE='tijari1-v1';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./fonts/aref-ruqaa-arabic-400-normal.woff2", "./fonts/aref-ruqaa-latin-400-normal.woff2", "./fonts/aref-ruqaa-arabic-700-normal.woff2", "./fonts/aref-ruqaa-latin-700-normal.woff2", "./fonts/markazi-text-arabic-400-normal.woff2", "./fonts/markazi-text-latin-400-normal.woff2", "./fonts/markazi-text-arabic-500-normal.woff2", "./fonts/markazi-text-latin-500-normal.woff2", "./fonts/markazi-text-arabic-600-normal.woff2", "./fonts/markazi-text-latin-600-normal.woff2", "./fonts/markazi-text-arabic-700-normal.woff2", "./fonts/markazi-text-latin-700-normal.woff2", "./fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2", "./fonts/ibm-plex-sans-arabic-latin-400-normal.woff2", "./fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2", "./fonts/ibm-plex-sans-arabic-latin-500-normal.woff2", "./fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2", "./fonts/ibm-plex-sans-arabic-latin-600-normal.woff2", "./fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2", "./fonts/ibm-plex-sans-arabic-latin-700-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('tijari1-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  if(new URL(req.url).origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r;})
      .catch(()=>caches.match('./index.html').then(r=>r||caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return res;})));
});
