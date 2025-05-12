import { env } from '$env/dynamic/private';
import type { Service } from '$lib/types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ fetch, route }) => {
    const res = await fetch(`${env.POSTGREST_URL}${route.id}?select=*,service_categories(id,name)&order=category_id`);
    const service: Service[] = await res.json();

    return { service };
};
