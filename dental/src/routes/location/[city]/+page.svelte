<script lang="ts">
	import MultiselectInput from '$lib/components/MultiselectInput.svelte';
	import { serviceCategories, type ServiceObj } from '$lib/components/data/services.js';
	import type { PageData } from './$types.js';
	import { page } from '$app/state';
	import Toast from '$lib/components/Toast.svelte';
	export let data: PageData;

	let serviceArray: ServiceObj[] = [];

	function capitalizeWords(str: string) {
		return str
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
	console.log(page.form);
	$: console.log(serviceArray);

	function expandHours(hoursObj: Record<string, string>) {
		const result: Record<string, { start: string; end: string } | null> = {
			Monday: null,
			Tuesday: null,
			Wednesday: null,
			Thursday: null,
			Friday: null,
			Saturday: null,
			Sunday: null
		};

		function to24(str: string): string {
			const [time, meridian] = str
				.trim()
				.toLowerCase()
				.split(/(am|pm)/);
			let [h, m = '00'] = time.split(':');
			let hour = parseInt(h);
			if (meridian === 'pm' && hour !== 12) hour += 12;
			if (meridian === 'am' && hour === 12) hour = 0;
			return `${String(hour).padStart(2, '0')}:${m}`;
		}

		if (hoursObj.weekdays) {
			const match = hoursObj.weekdays.match(
				/(\d{1,2}(?::\d{2})?\s*[ap]m)\s*-\s*(\d{1,2}(?::\d{2})?\s*[ap]m)/i
			);
			if (match) {
				const [_, start, end] = match;
				const range = { start: to24(start), end: to24(end) };
				['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach((day) => {
					result[day] = range;
				});
			}
		}

		if (hoursObj.saturday) {
			const match = hoursObj.saturday.match(
				/(\d{1,2}(?::\d{2})?\s*[ap]m)\s*-\s*(\d{1,2}(?::\d{2})?\s*[ap]m)/i
			);
			if (match) {
				const [_, start, end] = match;
				result.Saturday = { start: to24(start), end: to24(end) };
			}
		}

		if (hoursObj.sunday?.toLowerCase().includes('closed')) {
			result.Sunday = null;
		}

		return result;
	}

	const locationHours = expandHours(data.location.hours);
</script>

{#if page.form}
	{#if page.form.success === true}
		<Toast type="polite" time={'10000'} message={page.form.message}></Toast>
	{:else if page.form.success === false}
		<Toast type="assertive" time={'10000'} message={page.form.message}></Toast>
	{/if}
{/if}
<section class="py-5">
	<div class="container">
		<h1 class="text-center text-primary fw-bold mb-4">{data.location.name} Office</h1>
		<div class="row g-5">
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
			<div class="col-md-6">
				<div class="card shadow-sm h-100 border-0">
					<div class="card-body">
						<h4 class="fw-semibold mb-4">Request an Appointment</h4>
						<form method="POST" action="?/request">
							<div class="mb-3">
								<label class="form-label" for="firstName"
									>First Name <span class="text-danger">*</span></label
								>
								<input class="form-control" type="text" name="firstName" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="lastName"
									>Last Name <span class="text-danger">*</span></label
								>
								<input class="form-control" type="text" name="lastName" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="email"
									>Email <span class="text-danger">*</span></label
								>
								<input class="form-control" type="email" name="email" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="phone"
									>Phone <span class="text-danger">*</span></label
								>
								<input class="form-control" type="tel" name="phone" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="dob"
									>Date of Birth <span class="text-danger">*</span></label
								>
								<input class="form-control" type="date" name="dob" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="request-date"
									>Preferred Appointment Time<span class="text-danger">*</span></label
								>
								<input
									class="form-control"
									type="datetime-local"
									name="request-date"
									required
									on:change={(e) => {
										const val = e.currentTarget.value;
										const date = new Date(val);
										const day = date.toLocaleDateString(undefined, { weekday: 'long' });
										const time = val.split('T')[1];

										const constraint = locationHours[day];
										if (!constraint) {
											alert(`We are closed on ${day}. Please choose another day.`);
											e.currentTarget.value = '';
											return;
										}
										if (time < constraint.start || time > constraint.end) {
											alert(
												`Selected time must be between ${constraint.start} and ${constraint.end} on ${day}.`
											);
											e.currentTarget.value = '';
										}
									}}
								/>
							</div>
							<div class="mb-3">
								<label class="form-label" for="service"
									>Reason For Your Visit <span class="text-danger">*</span></label
								>
								<MultiselectInput {serviceCategories} bind:list={serviceArray}></MultiselectInput>
							</div>
							<div class="mb-3">
								<label for="notes">Notes For Doctor</label>
								<textarea class="form-control" name="notes" style="height: 100px"></textarea>
							</div>
							<input type="hidden" name="city" value={data.location.name} />
							<input type="hidden" name="service" value={JSON.stringify(serviceArray)} />
							<button type="submit" class="btn btn-primary w-100">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
