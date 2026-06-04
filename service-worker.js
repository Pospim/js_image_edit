const CACHE_NAME = "image-edit-v1";

const FILES = [
	"./",
	"./image_edit.html",
	"./manifest.webmanifest",
	"./icon.svg",
	"./icon-192.png",
	"./icon-512.png"
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES))
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((names) => {
			return Promise.all(
				names
					.filter((name) => name !== CACHE_NAME)
					.map((name) => caches.delete(name))
			);
		})
	);
});

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") {
		return;
	}

	event.respondWith(
		caches.match(event.request).then((cached) => {
			return cached || fetch(event.request);
		})
	);
});
