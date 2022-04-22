import { envDB } from '$lib/_dbConfig';
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function put({ request }) {
	const body = await request.json();
	const res = await fetch(`${envDB.inview}/${body._id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(body)
	});
	if (res.ok) {
		return {
			status: 200,
			ok: true
		};
	} else {
		return {
			status: 500,
			ok: false
		};
	}
}
