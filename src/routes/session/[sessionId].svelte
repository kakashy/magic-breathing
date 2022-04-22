<script lang="ts" context="module">
	import { get } from 'svelte/store';
	import { sessionDoc } from '$lib/stores';

	export const load = async ({ params, fetch }) => {
		const id = params.sessionId;
		const res = await fetch('/db/pata', {
			method: 'POST',
			body: JSON.stringify({
				id: id
			})
		})
			.catch((error) => {
				console.log('We have an error');
				return {
					props: {
						ok: false,
						ssrData: false,
						id: id
					}
				};
			})
			.then(async (result) => {
				const goodData = await result.json();
				if (goodData?.length > 0) {
					get(sessionDoc);
					sessionDoc.set(goodData);
					return {
						ok: true,
						ssrData: true
					};
				} else {
					return {
						props: {
							ssrData: false,
							id: id
						}
					};
				}
			});
		return {
			props: {
				id: id
			}
		};
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import SessionPage from '$lib/components/session-page/index.svelte';

	export let ssrData, id;

	onMount(async () => {
		const local = new PouchDB('inview');
		if (ssrData === undefined || !ssrData) {
			const result = await local.get(id);
			if (result) {
				get(sessionDoc);
				sessionDoc.set(result);
			}
		}
	});
</script>

<section>
	<SessionPage />
</section>

<style>
	section {
		padding: 40px 20px;
	}
</style>
