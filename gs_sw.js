var C="geosnap-v1";
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","index.html","manifest.json","icon-192.png","icon-512.png"]);}));
  self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C;}).map(function(x){return caches.delete(x);}));}));
  self.clients.claim();
});
self.addEventListener("fetch",function(e){
  var r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin){return;}
  e.respondWith(fetch(r).then(function(res){
    var cp=res.clone();
    caches.open(C).then(function(c){c.put(r,cp);});
    return res;
  }).catch(function(){return caches.match(r);}));
});
