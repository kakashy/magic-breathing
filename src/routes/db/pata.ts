import { envDB } from '$lib/_dbConfig';
export const post = async ({ request }) => {
	const body = await request.json();
	const doc = await fetch(`${envDB.inview}/${body.id}`, { method: 'GET' }).catch(() => {
		return {
			status: 500,
			ok: false
		};
	}).catch(() => {
		return {
			status: 500,
			ok: false
		};
	});
	if (doc) {
		// await doc.json()
		return {
			status: 200,
			ok: true,
			body: doc
		};
	}
	return {};
};
