import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ fetch, route }) => {
    const res = await fetch(`${env.POSTGREST_URL}/locations`);
    const locations = await res.json();

    return { locations };
};
