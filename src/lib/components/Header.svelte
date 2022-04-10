<script>
	import SearchBar from './search-bar/index.svelte';
</script>

<header>
	<div>
		<span>
			<img src="/favicon.png" alt="Magic Breathing App" height="20px" />
		</span>
		<a href="/"> Magic Breathing App </a>
	</div>
	<SearchBar />
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		height: 50px;
		width: 100%;
		max-width: 100vw;
		background: linear-gradient(to bottom, #111110, transparent);
		backdrop-filter: blur(1px);
		padding: 10px 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		z-index: 99;
	}
	header a {
		color: var(--col);
		font-weight: bold;
		padding: 0 30px;
	}
	header a:hover {
		color: var(--accent);
	}
</style>
