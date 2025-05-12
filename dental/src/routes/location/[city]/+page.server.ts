import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import type { Actions } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params }) => {

	function capitalizeWords(str: string): string {
		return str
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	const city = params.city;
	const locationRes = await fetch(`${env.POSTGREST_URL}/locations?name=eq.${capitalizeWords(city)}`);
	const location = await locationRes.json();
	const servicesRes = await fetch(`${env.POSTGREST_URL}/services`);
	const services = await servicesRes.json()

	return { location, services };

};

export const actions = {
	request: async ({ request }) => {
		const data = await request.formData();

		let raw = data.get("service");
		let parsedServices: object[] = [];

		try {
			if (raw) parsedServices = JSON.parse(raw as string);
		} catch (e) {
			console.error("Invalid JSON in service field", raw);
			return fail(400, { message: "Invalid service data", values: Object.fromEntries(data) });
		}

		const formData = {
			location_id: data.get("locationId"),
			first_name: data.get("firstName"),
			last_name: data.get("lastName"),
			email: data.get("email"),
			phone: data.get("phone"),
			dob: data.get("dob"),
			request_date: data.get("request-date"),
			service_ids: parsedServices.map((service) => Object.keys(service)[0]),
			notes: data.get("notes")
		};

		try {
			const post = await fetch(`${env.POSTGREST_URL}/appointments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formData)
			});

			if (!post.ok) {
				console.error("PostgREST error", await post.text());
				return fail(400, {
					success: false,
					message: "Your request could not be submitted.",
					formData
				});
			}
		} catch (err) {
			console.error("Failed to submit appointment", err);
			return fail(500, { message: "Internal server error", values: formData });
		}

		return {
			success: true,
			message: "Your request has been submitted!",
			formData
		};
	}
} satisfies Actions;
