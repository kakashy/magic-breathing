<script>
	import '@splidejs/svelte-splide/css';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import RegularProfile from '../regular-profile/index.svelte';
	import { sessionItems } from '$lib/stores';
	let options = {
		perPage: 6,
		breakpoints: {
			1024: {
				perPage: 4
			},
			767: {
				perPage: 3
			},
			640: {
				perPage: 2
			}
		},
		arrows: false,
		gap: '9rem'
	};
</script>

{#await $sessionItems}
	<blockquote>Looking for those amazing sessions</blockquote>
{:then sessions}
	<h2 class="power">Powerful Techniques</h2>
	<Splide aria-label="Refreshing Sessions" {options}>
		{#each sessions as session}
			<SplideSlide>
				<RegularProfile
					guideId={session.doc.guideId}
					sessionId={session.doc._id}
					profName={session.doc.guide}
					imgSrc={session.doc.guideImg}
					courseName={session.doc.title}
					rating={session.doc.rating}
					difficulty={session.doc.difficulty}
				/>
			</SplideSlide>
		{/each}
	</Splide>
{:catch error}
	<pre>Whoops. We made a mis-step. Something went wrong.</pre>
{/await}

<style>
	.power {
		color: gray;
		opacity: 0.8;
	}
</style>
