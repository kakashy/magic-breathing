<script>
	import { fly } from 'svelte/transition';
	export let url = '';
</script>

{#key url}
	<div in:fly={{ y: -20, duration: 500, delay: 500 }} out:fly={{ y: 20, duration: 500 }}>
		<slot />
	</div>
{/key}
