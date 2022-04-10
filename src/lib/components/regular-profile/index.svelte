<script lang="ts">
	export let imgSrc: string;
	export let profName: string;
	export let courseName: string;
	export let rating: string | number;
	export let difficulty: string;
	export let sessionId: string;
	export let guideId: string;
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
</script>

<div class="reg">
	<div class="intro">
		<img src={imgSrc} alt={profName} height="120px" />
		<img src={difficultyUrl} width="20px" height="20px" alt="" />
	</div>
	<div class="meta">
		<p class="name">
			{profName}
		</p>
		<a href={`/session/${guideId}/${sessionId}`}>
			<h3 class="course">
				{courseName}
			</h3>
		</a>
		<p class="rating">
			{rating} 🌟
		</p>
	</div>
</div>

<style>
	.reg {
		padding: 45px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		opacity: 0.8;
	}
	.reg:hover {
		opacity: 1;
	}
	.reg img {
		border-radius: 50%;
	}
	.intro {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}
	.meta a {
		color: var(--col);
	}
	.meta a:hover {
		color: var(--accent);
	}
	.name {
		opacity: 0.7;
	}
	.rating {
		font-size: 0.7rem;
	}
</style>
