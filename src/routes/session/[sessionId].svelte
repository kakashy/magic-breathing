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
		});
		if (res.ok) {
			get(sessionDoc);
			sessionDoc.set(await res.json());
			return {
				ok: true
			};
		} else {
		}
		return {};
	};
</script>

<script lang="ts">
	import SessionPage from '$lib/components/session-page/index.svelte';
</script>

<section>
	<SessionPage />
</section>

<style>
	section {
		padding: 40px 20px;
	}
</style>
