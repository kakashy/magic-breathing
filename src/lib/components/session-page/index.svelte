<script lang="ts">
	import { sessionDoc } from '$lib/stores';
	import { fly } from 'svelte/transition';
	function getUrl(difficulty) {
		let difficultyUrl: string;

		switch (difficulty) {
			case 'easy':
				difficultyUrl = '/media/icons/network-easy.svg';
				break;
			case 'mid':
				difficultyUrl = '/media/icons/network-mid.svg';
				break;
			case 'hard':
				difficultyUrl = '/media/icons/network-hard.svg';
				break;
			default:
				difficultyUrl = '/media/icons/network.svg';
				break;
		}
		return difficultyUrl;
	}
</script>

<svelte:head>
	<title>magic breathing app</title>
</svelte:head>

{#await $sessionDoc}
	<div class="fetch">
		<p class="wait">Fetching document</p>
	</div>
{:then doc}
	<div class="session">
		<div class="meta">
			<img src={doc.guideImg} alt="" />
			<img src={getUrl(doc.difficulty)} width="20px" height="20px" alt="" />
		</div>
		<hr />
		<div class="content" in:fly={{ y: -10, duration: 400, delay: 800 }}>
			<h1 class="title">{doc.title}</h1>
			<sub>{doc.guide}</sub>
			<hr />
			<p>
				{doc.body}
			</p>
		</div>
	</div>
{/await}

<style>
	.fetch {
		min-height: 75%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.wait {
		background: #ffffff20;
		padding: 50px;
		border-radius: 5px;
	}
	.session {
		padding: 5px;
	}
	.session,
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.meta img {
		border-radius: 50%;
	}
	.session p {
		padding: 15px;
	}
</style>
