<script context="module">
	import { get } from 'svelte/store';
	import { sessionItems } from '$lib/stores';
	export const load = async ({ fetch }) => {
		const res = await fetch('/db/get-em', {
			method: 'POST',
			body: JSON.stringify({
				params:
					'_all_docs?include_docs=true&inclusive_end=true&start_key=session&end_key=session%5Cufff0'
			})
		});
		if (res.ok) {
			get(sessionItems).values;
			sessionItems.set(await res.json());
			return {
				ok: true
			};
		} else {
		}
		return {};
	};
</script>

<script lang="ts">
	import HeroCarousel from '$lib/components/hero-carousel/index.svelte';
	import BottomCarousel from '$lib/components/bottom-carousel/index.svelte';
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
