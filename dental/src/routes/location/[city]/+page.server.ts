import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { locations } from '$lib/components/data/locations.js';

export const load: PageServerLoad = async ({ params }) => {
	const city = params.city;

	const location = locations.find((loc) => loc.path === `/location/${city}`);

	if (location) {
		return { location }; 
	} else {
		throw error(404, 'Location not found');
	}
};
