<script lang="ts">
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import type { ServiceCategories } from '$lib/types.js';

	export let data;

	const categories: ServiceCategories[] = data.service
		.map((service) => service.service_categories)
		.filter((category): category is ServiceCategories => Boolean(category));

	let groupedServices = new Map<number, any[]>();

	$: {
		groupedServices = new Map();
		for (const service of data.service) {
			if (!groupedServices.has(service.category_id)) {
				groupedServices.set(service.category_id, []);
			}
			groupedServices.get(service.category_id)?.push(service);
		}
	}

	onMount(() => {
		AOS.init({ once: true });
	});
</script>

<section class="py-5 bg-light">
	<div class="container">
		<h1 class="text-center text-primary fw-bold mb-5">Our Dental Services</h1>

		{#each Array.from(groupedServices.entries()) as [categoryId, services]}
			<div class="mb-5">
				<h3 class="text-center text-secondary fw-semibold mb-4">
					{categories.find((cat) => cat.id === categoryId.toString())?.name}
				</h3>
				<div class="row justify-content-around g-4">
					{#each services as service}
						<div class="col-md-4 col-sm-6" data-aos="fade-up">
							<div class="card h-100 shadow-sm border-0">
								<div class="card-body text-center">
									<i class={`fa ${service.icon} fa-3x text-primary mb-3`} aria-hidden="true"></i>
									<h5 class="card-title fw-semibold">{service.name}</h5>
									<p class="card-text">{service.description}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	h3 {
		border-bottom: 2px solid #dee2e6;
		display: inline-block;
		padding-bottom: 0.4rem;
	}
</style>
