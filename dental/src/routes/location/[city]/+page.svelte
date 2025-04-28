<script lang="ts">
	import MultiselectInput from '$lib/components/MultiselectInput.svelte';
	import { serviceCategories } from '$lib/components/data/services.js';
	import type { PageData } from './$types.js';
	import { page } from '$app/state';
	import Toast from '$lib/components/Toast.svelte';
	export let data: PageData;

	function capitalizeWords(str: string) {
		return str
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	console.log(page.form)
</script>

{#if page.form}
	{#if page.form.success === true}
		<Toast type="polite" time={"10000"} message={page.form.message}></Toast>
	{:else if page.form.success === false}
		<Toast type="assertive" time={"10000"} message={page.form.message}></Toast>
	{/if}
{/if}
<section class="py-5">
	<div class="container">
		<h1 class="text-center text-primary fw-bold mb-4">{data.location.name} Office</h1>
		<div class="row g-5">
			<!-- Contact Info -->
			<div class="col-md-6">
				<div class="card shadow-sm h-100 border-0">
					<div class="card-body">
						<h4 class="fw-semibold">Contact Information</h4>
						<p>
							<i class="fa fa-phone text-primary me-2"></i>Phone:
							<a href={`tel:${data.location.phone}`}>{data.location.phone}</a><br />
							<i class="fa fa-envelope text-primary me-2"></i>Email:
							<a href={`mailto:${data.location.email}`}>{data.location.email}</a>
						</p>
						<hr />
						<h6 class="text-muted fw-semibold">Hours of Operation</h6>
						{#if data.location.hours}
							{#each Object.entries(data.location.hours) as [key, value]}
								<p class="mb-1">{capitalizeWords(key)}:</p>

								<p class="mb-1">{value}</p>
							{/each}
						{:else}
							<p class="text-muted">No hours available</p>
						{/if}
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="col-md-6">
				<div class="card shadow-sm h-100 border-0">
					<div class="card-body">
						<h4 class="fw-semibold mb-4">Request an Appointment</h4>
						<form method="POST" action="?/request">
							<input type="hidden" name="city" value={data.location.name} />
							<div class="mb-3">
								<label class="form-label" for="firstName">First Name</label>
								<input class="form-control" type="text" name="firstName" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="lastName">Last Name</label>
								<input class="form-control" type="text" name="lastName" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="email">Email</label>
								<input class="form-control" type="email" name="email" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="phone">Phone</label>
								<input class="form-control" type="tel" name="phone" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="dob">Date of Birth</label>
								<input class="form-control" type="date" name="dob" required />
							</div>
							<div class="mb-3">
								<label for="service">Select A Service</label>
								<MultiselectInput serviceCategories={serviceCategories}></MultiselectInput>
							</div>
							<button type="submit" class="btn btn-primary w-100">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
