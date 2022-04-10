// import type { SessionItems } from './types'
import { writable } from 'svelte/store';

export const sessionItems = writable([]);

export const sessionDoc = writable({
	body: '',
	brief: '',
	difficulty: '',
	guide: '',
	guideImg: 'https://source.unsplash.com/random/300x300',
	rating: undefined,
	title: ''
});
