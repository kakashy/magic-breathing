import { envDB } from '$lib/_dbConfig';
export const post = async ({ request }) => {
	const body = await request.json();
	const doc = await (await fetch(`${envDB.inview}/${body.id}`, { method: 'GET' })).json();
	if (doc) {
		return {
			status: 200,
			ok: true,
			body: doc
		};
	}
	return {};
};
