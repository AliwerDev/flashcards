if (!self.define) {
  let e,
    s = {};
  const c = (c, a) => (
    (c = new URL(c + ".js", a).href),
    s[c] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const i = e || ("document" in self ? document.currentScript.src : "") || location.href;
    if (s[i]) return;
    let t = {};
    const r = (e) => c(e, i),
      d = { module: { uri: i }, exports: t, require: r };
    s[i] = Promise.all(a.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/_next/app-build-manifest.json", revision: "b5a1856d85f13d04ac0b598841364ae4" },
        { url: "/_next/static/cMMjUNX30vRpRI-VK7Kp_/_buildManifest.js", revision: "3e2d62a10f4d6bf0b92e14aecf7836f4" },
        { url: "/_next/static/cMMjUNX30vRpRI-VK7Kp_/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
        { url: "/_next/static/chunks/1026.05db4eb443c5e4a4.js", revision: "05db4eb443c5e4a4" },
        { url: "/_next/static/chunks/1406-bac65c9621fb085a.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/2591-e04d302817f2ed86.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/2765-c0dd17f0eb6e5db2.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/2876-7d8a611507ef2aca.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/2956-b3f17d5ee89ee5fe.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/3169-d27fed81f64bb8d1.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/3487-681c7ae385f7993e.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/3587-6520c026b0a74661.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/3865.321ff24a8d5d5abd.js", revision: "321ff24a8d5d5abd" },
        { url: "/_next/static/chunks/3975359d.62cb91697ae7e214.js", revision: "62cb91697ae7e214" },
        { url: "/_next/static/chunks/4315-f94828ead469d0e5.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/5057-da32ffb04902e41f.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/59650de3-85a22834e9879982.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/6004.e78a602ed9561aaf.js", revision: "e78a602ed9561aaf" },
        { url: "/_next/static/chunks/6159-a20eb1f5833193bc.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/6384-773ad36a908cd924.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/6422-b60ea8b0aa0227e0.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/66ec4792-1729317bef32c062.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/7023-9c62d04de5b2c94d.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/7138-ce5cfbfead04ab69.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/7207-a6ef33290e4c36bf.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/7350-a77285f9a9facd75.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/7424-a54f31b3b81e35f0.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/795d4814-9d8b710df094c934.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/83.fb528b8af57f8584.js", revision: "fb528b8af57f8584" },
        { url: "/_next/static/chunks/8359-c2c6fd85b5d06a52.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/8421-37ffe1c34e6f11bb.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/8569-f6c837ad1748dfa3.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/8942-64426d5a9ec4ffef.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/8e1d74a4-b646c40c2315dd38.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/9197-f4baee17cdee761e.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/9210-b948dec36cec322d.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/996-c7f56ca024a41eed.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/9c4e2130-aac6b440af09305f.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/admin/layout-8e6315d8bb15d35e.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/admin/page-21f9561ca0a4a3dc.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/auth/layout-172c44432c114662.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/auth/login/page-e88f80c5623ddf0b.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/auth/register/page-1e77725a5f6b59e6.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/dashboard/analitics/page-9643e06b9b6c74ab.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/dashboard/cards/page-de522663b6e24dfb.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/dashboard/layout-4fdeccbf6bc966d6.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/dashboard/page-8d64b46cc16308ea.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/dashboard/play/page-afd3cd9231ac0eed.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/dashboard/profile/page-5a252fea08ad78e6.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/layout-db6a974a7c4f4a11.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/loading-93854a9aedd98ef7.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/%5Blang%5D/page-04859c83b474a6a6.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/app/_not-found/page-cdde5809ef1f030d.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/c916193b-d94cd4bfb2839168.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/eec3d76d-d6b18641895dc1d1.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/f7333993-f587ccd94b97452d.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/fd9d1056-46ee10d90666f85a.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/framework-8e0e0f4a6b83a956.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/main-5f5b60de9cddfbee.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/main-app-4d58be25375f9338.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/pages/_app-f870474a17b7f2fd.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js", revision: "79330112775102f91e1010318bae2bd3" },
        { url: "/_next/static/chunks/webpack-6f6c0a8232cf039c.js", revision: "cMMjUNX30vRpRI-VK7Kp_" },
        { url: "/_next/static/css/eb48b9d413be227d.css", revision: "eb48b9d413be227d" },
        { url: "/_next/static/media/4ca6e670f87e1ed5-s.woff2", revision: "a532ce3d6b80e2103adf2cd052e5d249" },
        { url: "/_next/static/media/8884e2c434b4009d-s.woff2", revision: "f5f220f600ab30c023e966b87a066826" },
        { url: "/_next/static/media/b73acfbf2ca591c8-s.woff2", revision: "3f95d1d28e241c93097fa5fcfeea60b6" },
        { url: "/_next/static/media/de88814aa7e0de1d-s.woff2", revision: "004180e524500b3e800cb6c9c5b0d22e" },
        { url: "/_next/static/media/f20c3749fc6b6920-s.p.woff2", revision: "997cbc32021bdfee909545fe5ef558ed" },
        { url: "/assets/flags/russia.png", revision: "5471e465a5457ea48aea23b18fb6806e" },
        { url: "/assets/flags/united-kingdom.png", revision: "e667999048e9c8c5c5610d1d33908e52" },
        { url: "/assets/flags/uzbekistan.png", revision: "0e886a70671ab2508831074457df46dd" },
        { url: "/assets/icons/ic_github.svg", revision: "8446d82614f72540a058a233fa229ced" },
        { url: "/assets/icons/ic_google.svg", revision: "614bc7916ea808fd52e7b58b221ca1a5" },
        { url: "/assets/images/logo.png", revision: "189751d8adca0d0ecc9f19055e19c5d9" },
        { url: "/assets/logo/flashcards.svg", revision: "4be6ab0a674d5e27749559e3f0950908" },
        { url: "/assets/logo/flashcards1.svg", revision: "2d5dc3b2fff06d331c6c9058c20a48d4" },
        { url: "/assets/logo/icon-192x192.png", revision: "6a55ac8fcfa50af8d2cc10c35d4d461d" },
        { url: "/assets/logo/icon-256x256.png", revision: "9c55e24132644cad9c4270dd9bde97dc" },
        { url: "/assets/logo/icon-384x384.png", revision: "7d5fa0d66bcf1d7b577dd488a111a600" },
        { url: "/assets/logo/icon-512x512.png", revision: "f74249e67d681228421234e72db2b95f" },
        { url: "/assets/logo/logo-mini.svg", revision: "6f29f84c7233dd7cf40323ee034552fd" },
        { url: "/assets/logo/logo.svg", revision: "784cbb6ddd28a86fda3bc2c34e1516ee" },
        { url: "/assets/manifest.json", revision: "1a0151e665824e77bda4930edf8e266e" },
        { url: "/favicon.ico", revision: "f6063badddc4cc9e60df9899d3ac544f" },
        { url: "/favicon.png", revision: "f6063badddc4cc9e60df9899d3ac544f" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute("/", new e.NetworkFirst({ cacheName: "start-url", plugins: [{ cacheWillUpdate: async ({ request: e, response: s, event: c, state: a }) => (s && "opaqueredirect" === s.type ? new Response(s.body, { status: 200, statusText: "OK", headers: s.headers }) : s) }] }), "GET"),
    e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i, new e.CacheFirst({ cacheName: "google-fonts-webfonts", plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })] }), "GET"),
    e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i, new e.StaleWhileRevalidate({ cacheName: "google-fonts-stylesheets", plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }), "GET"),
    e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i, new e.StaleWhileRevalidate({ cacheName: "static-font-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }), "GET"),
    e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i, new e.StaleWhileRevalidate({ cacheName: "static-image-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(/\/_next\/image\?url=.+$/i, new e.StaleWhileRevalidate({ cacheName: "next-image", plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(/\.(?:mp3|wav|ogg)$/i, new e.CacheFirst({ cacheName: "static-audio-assets", plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(/\.(?:mp4)$/i, new e.CacheFirst({ cacheName: "static-video-assets", plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(/\.(?:js)$/i, new e.StaleWhileRevalidate({ cacheName: "static-js-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(/\.(?:css|less)$/i, new e.StaleWhileRevalidate({ cacheName: "static-style-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i, new e.StaleWhileRevalidate({ cacheName: "next-data", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(/\.(?:json|xml|csv)$/i, new e.NetworkFirst({ cacheName: "static-data-assets", plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), "GET"),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({ cacheName: "apis", networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({ cacheName: "others", networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
      "GET"
    ),
    e.registerRoute(({ url: e }) => !(self.origin === e.origin), new e.NetworkFirst({ cacheName: "cross-origin", networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })] }), "GET");
});
