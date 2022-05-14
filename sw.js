<link rel="stylesheet" class="aplayer-secondary-style-marker" href="\assets\css\APlayer.min.css"><script src="\assets\js\APlayer.min.js" class="aplayer-secondary-script-marker"></script><script class="meting-secondary-script-marker" src="\assets\js\Meting.min.js"></script><link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/hint.css/2.4.1/hint.min.css">importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@4.3.1/build/workbox-sw.min.js');

if (!workbox) {
    console.log("Boo! Workbox didn't load 😬");
}

/*
var cacheFiles = [
    {
        url: '/about/index.html',
        revision: 'beta1.1' // 加revision，版本改了以後，sw.js 在 application 上會更新
    }
];
workbox.precaching.precacheAndRoute(cacheFiles);
*/

workbox.routing.registerRoute(
    'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
    new workbox.strategies.StaleWhileRevalidate()
);

//缓存文件
workbox.routing.registerRoute(
    /\.css$/,   //通过正则匹配需要缓存哪些文件
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'css-cache',  //缓存名，可在application-> Cache storage下找到
        plugins: [
            new workbox.expiration.Plugin({
              // Cache for a maximum of a week
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:js)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'js-cache',
        plugins: [
            new workbox.expiration.Plugin({
              // Cache for a maximum of a week
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);

workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
    })
);

workbox.routing.registerRoute(
    // Cache font files.
    /\.(?:woff2|eot|ttf|woff)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'font-cache',
    })
);