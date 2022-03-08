import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (query) => {
	const response = await api('POST', `https://countries.trevorblades.com/graphql`, query);

	if (response.status === 404) {
		return {
			body: {
				todos: []
			}
		};
	}

	if (response.status === 200) {
		return await response.json()
	}

	return {
		status: response.status
	};
};
