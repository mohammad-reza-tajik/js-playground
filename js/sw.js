
const serviceWorker = self;

serviceWorker.addEventListener("install", (event ) => {
    console.log("-----[ service worker installed ]-----");

    event.waitUntil((async () => {
        try {
            await serviceWorker.skipWaiting(); // returned promise can be ignored safely
            // Force the waiting service worker to become the active service worker.
        } catch (err) {
            console.error("Install event failed:", err);
        }
    })());
});

serviceWorker.addEventListener("activate", (event) => {
    console.log("-----[ service worker activated ]-----");

    event.waitUntil((async () => {
        try {
            const allClients = await serviceWorker.clients.matchAll({ includeUncontrolled: true });
            allClients.forEach(client => {
                client.postMessage("activated");
            });

            // Tell the active service worker to take control of the page immediately.
            await serviceWorker.clients.claim();
        } catch (err) {
            console.error("Activate event failed:", err);
        }
    })());
});

serviceWorker.addEventListener("message", (event) => {
    console.log(event.data);
    serviceWorker.registration.showNotification("Hello World");
});
