<script lang="ts">
	import HeroCarousel from '$lib/components/hero-carousel/index.svelte';
	import BottomCarousel from '$lib/components/bottom-carousel/index.svelte';
	import { onMount } from 'svelte';
	import { getRecords } from '$lib/db';
	import { sessionItems } from '$lib/stores';
	onMount(async () => {
		$sessionItems = getRecords('session', undefined, undefined);
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
		padding: 40px 20px;
		height: 100%;
		min-height: 80vh;
		color: white;
		background: var(--fancy-bg) center;
		background-size: cover;
	}
</style>
