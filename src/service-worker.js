import { build, version, files } from '$service-worker';
const applicationCache = `applicationCache-v${version}`;
const staticCache = `staticCache-v${version}`;

// Caches the svelte app (not the data)
self.addEventListener('install', (event) => {
	event.waitUntil(
		Promise.all([
			caches.open('ssrCache').then((cache) => cache.addAll(['/'])),
			caches.open(applicationCache).then((cache) => cache.addAll(build)),
			caches.open(staticCache).then((cache) => cache.addAll(files))
		]).then(self.skipWaiting())
	);
});

// Removes old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		clients.claim(),
		caches
			.keys()
			.then((keys) => {
				return Promise.all(
					keys
						.filter(
							(key) =>
								key !== applicationCache &&
								key !== staticCache &&
								key !== 'postsCache' &&
								key !== 'ssrCache'
						)
						.map((key) => caches.delete(key))
				);
			})
			.then(self.skipWaiting())
			.then(() => console.log('activated'))
	);
});
self.addEventListener('fetch', (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request);
		})
	);
});
