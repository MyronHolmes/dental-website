import type { PageServerLoad } from './$types.js';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async () => {

    const locationRes = await fetch(`${env.POSTGREST_URL}/locations`);
    const locations = await locationRes.json();

    return { locations };

};