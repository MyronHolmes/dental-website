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

		console.log(data)

		let raw = data.get("service");
		let parsedServices: object[] = [];
		
		try {
			if (raw) parsedServices = JSON.parse(raw as string);
		} catch (e) {
			console.error("Invalid JSON in service field", raw);
		}
		
		const formData = {
			city: data.get("city"),
			firstName: data.get("firstName"),
			lastName: data.get("lastName"),
			email: data.get("email"),
			phone: data.get("phone"),
			dob: data.get("dob"),
			service: parsedServices
		};
		console.log(formData)
		return { success: true, formData, message: "Your request has been submitted!"}
		
	}
} satisfies Actions;