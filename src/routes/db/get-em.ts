import { envDB } from '$lib/_dbConfig';
/**
 * @type import('@sveltejs/kit').RequestHandler
 */
export async function post({ request }) {
	const body = await request.json();
	const res = await fetch(`${envDB.inview}/${body.params}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	}).catch((err) => {
		return {
			status: 500,
			ok: false,
			body: {
				error: err
			}
		};
	});
	if (!res.ok) {
		return {};
	} else {
		const matokeo = await res.json();
		const { rows } = matokeo;
		if (rows) {
			return {
				status: 200,
				ok: true,
				body: rows
			};
		} else {
			return {};
		}
	}
	return {};
}
