<script>
	import '@splidejs/svelte-splide/css';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import RegularProfile from '../regular-profile/index.svelte';
	import { sessionItems } from '$lib/stores';
	let options = {
		perPage: 6,
		breakpoints: {
			1024: {
				perPage: 5
			},
			767: {
				perPage: 3
			},
			640: {
				perPage: 2
			}
		},
		arrows: false
	};
</script>

{#await $sessionItems}
	<blockquote>Looking for those amazing sessions</blockquote>
{:then sessions}
	<Splide aria-label="Refreshing Sessions" {options}>
		{#each sessions as session}
			<SplideSlide>
				<RegularProfile
					guideId={session.guideId}
					sessionId={session.sessionId}
					profName={session.guide}
					imgSrc={session.guideImg}
					courseName={session.title}
					rating={session.rating}
					difficulty={session.difficulty}
				/>
			</SplideSlide>
		{/each}
	</Splide>
{:catch error}
	<pre>Whoops. We made a mis-step. Something went wrong.</pre>
{/await}
