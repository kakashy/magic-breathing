<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => ({ props: { url } });
</script>

<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';

	export let url: string;
</script>

<Header />
<main>
	<PageTransition {url}>
		<slot />
	</PageTransition>
</main>

<style>
	main {
		padding-top: 10px;
		min-height: 75vh;
	}
</style>
