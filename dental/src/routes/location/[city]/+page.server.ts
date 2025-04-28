import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import type { Actions } from "@sveltejs/kit"; 
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

export const actions = {
	request: async ({ request }) => {
		const data = await request.formData()

		let selected = data.getAll("service") as string[]
		const parsedServices = selected.map(item => {
			try {
				return JSON.parse(item as string);
			} catch (e) {
				console.error("Failed to parse service item", item);
				return null;
			}
		}).filter(Boolean); 

		const formData = {
			city: data.get("city"),
			firstName: data.get("firstName"),
			lastName: data.get("lastName"),
			email: data.get("email"),
			phone: data.get("phone"),
			dob: data.get("dob"),
			service: parsedServices
		};

		return { success: true, formData, message: "Your request has been submitted!"}
		
	}
} satisfies Actions;