<script context="module">
	/** @type import('@sveltejs/kit').ErrorLoad*/
	export async function load({ error, status }) {
		return {
			props: {
				error: error,
				status: status
			}
		};
	}
</script>

<script>
	export let error, status;
</script>

<svelte:head>
	<title>
		{status} - magic breathing app
	</title>
</svelte:head>

<section>
	<div>
		{#if status === 404}
			<p>We can't find this page. Sorry.</p>
		{:else if status === 500}
			<p>😪This one is on us. Try reloading this page or try another time.</p>
		{:else}
			<p>😬This shouldn't happen. <a sveltekit:prefetch href="/">Go back home?</a></p>
			{error}
		{/if}
	</div>
</section>

<style>
	section {
		padding: 50px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		font-size: 1.2rem;
	}
	div {
		width: 50%;
		background: #00ff7320;
		padding: 20px;
		border-radius: 10px;
		box-shadow: var(--shadow);
		text-align: center;
	}
</style>
