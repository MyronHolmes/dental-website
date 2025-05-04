<script lang="ts">
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import { serviceCategories } from '$lib/components/data/services.js';

	onMount(() => {
		AOS.init({ once: true });
	});
</script>

<section class="py-5 bg-light">
	<div class="container">
		<h1 class="text-center text-primary fw-bold mb-5">Our Dental Services</h1>

		{#each serviceCategories as category}
			<div class="mb-5">
				<h3 class="text-center text-secondary fw-semibold mb-4">{category.name}</h3>
				<div class="row justify-content-around g-4">
					{#each category.services as service}
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
