<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	export let data;
	function navigateTo(path: string) {
		goto(path);
	}
</script>

<section class="py-5">
	<div class="container">
		<h1 class="text-center text-primary fw-bold mb-5">Contact Us</h1>
		<div class="row g-4">
			{#each data.locations as location}
				<div class="col-md-4">
					<button
						type="button"
						class="card h-100 shadow-sm border-0 w-100 p-0 bg-white accessible-card d-flex align-items-center justify-content-center"
						on:click={() => navigateTo(base + location.path)}
						on:keydown={(e) => e.key === 'Enter' && navigateTo(location.path)}
					>
						<div class="card-body text-center">
							<h5 class="card-title fw-semibold">{location.name}</h5>
							<p><i class="fa fa-phone text-primary me-2"></i> {location.phone}</p>
							<p><i class="fa fa-envelope text-primary me-2"></i> {location.email}</p>
							<hr />
							<h6 class="text-muted fw-semibold">Hours of Operation</h6>
							<p class="mb-1">{location.weekday_hours}</p>
							<p class="mb-1">{location.saturday_hours}</p>
							<p class="mb-0">{location.sunday_hours}</p>
						</div>
					</button>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.accessible-card {
		background-color: white;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		border-radius: 0.25rem;
	}

	.accessible-card:hover,
	.accessible-card:focus {
		outline: none;
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	}
</style>
