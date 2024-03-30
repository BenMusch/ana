import { CHEAT_SHEET_NWL23 } from '$lib/collections';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const collection = CHEAT_SHEET_NWL23.find(({ id }) => id === params.id);
	if (collection) {
		console.log(collection);
		return {
			collection
		};
	}

	error(404, 'Not found');
};
