<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const id = params.sessionId;
		const guideId = params.sessionGuide;
		return {
			props: {
				guideId: guideId,
				id: id
			}
		};
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { getRecords } from '$lib/db';
	import SessionPage from '$lib/components/session-page/index.svelte';
	import { sessionDoc } from '$lib/stores';
	export let guideId: string;
	export let id: string;
	onMount(async () => {
		$sessionDoc = getRecords('session', guideId, id);
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
