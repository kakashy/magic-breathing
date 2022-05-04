<script context="module">
	import { get } from 'svelte/store';
	import { sessionItems } from '$lib/stores';
	export const load = async ({ fetch }) => {
		try {
			const result = await fetch('/db/get-em', {
				method: 'POST',
				body: JSON.stringify({
					params:
						'_all_docs?include_docs=true&inclusive_end=true&start_key=session&end_key=session%5Cufff0'
				})
			});
			const goodData = await result.json();
			if (goodData?.length > 0) {
				get(sessionItems).values;
				sessionItems.set(goodData);
				return {
					ok: true,
					ssrData: true
				};
			} else {
				return {
					props: {
						ssrData: false
					}
				};
			}
		} catch (error) {
			console.log('We have an error');
			return {
				props: {
					ok: false,
					ssrData: false
				}
			};
		}
	};
</script>

<script lang="ts">
	import HeroCarousel from '$lib/components/hero-carousel/index.svelte';
	import BottomCarousel from '$lib/components/bottom-carousel/index.svelte';
	import { envDB } from '$lib/_dbConfig';
	import { onMount } from 'svelte';

	export let ssrData;

	onMount(async () => {
		// const pouchdb = await import('pouchdb-browser/lib/index');
		const local = new PouchDB('inview');
		const remote = new PouchDB(envDB.inview);
		remote.replicate.to(local);

		if (ssrData === undefined || !ssrData) {
			// no data from ssr, try locally
			const result = await local.allDocs({
				include_docs: true,
				attachments: true,
				startkey: 'session',
				endkey: 'session\ufff0'
			});
			if (result) {
				const { rows } = result;
				get(sessionItems).values;
				sessionItems.set(rows);
			}
		}
	});
</script>

<svelte:head>
	<title>Magic Breathing App</title>
	<meta
		name="description"
		content="Guided meditation and breathing techniques have never been this accessible"
	/>
	<meta name="keywords" content="breathing" />
</svelte:head>

<section>
	<HeroCarousel />
	<BottomCarousel />
</section>

<style>
	section {
		padding: 40px 5%;
		margin: 0 auto;
		height: 100%;
		min-height: 80vh;
		color: white;
		background: var(--fancy-bg) center;
		background-size: cover;
		max-width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
