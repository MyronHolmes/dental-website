<script lang="ts">
	import MultiselectInput from '$lib/components/MultiselectInput.svelte';
	import type { PageData } from './$types.js';
	import { page } from '$app/state';
	import Toast from '$lib/components/Toast.svelte';
	export let data: PageData;

	let serviceArray: Record<string, string>[] = [];

	function formatTo12Hour(time: string): string {
		const [hourStr, minuteStr] = time.split(':');
		let hour = parseInt(hourStr, 10);
		const minute = parseInt(minuteStr, 10);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		hour = hour % 12 || 12;
		return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
	}

	function expandHours(location: {
		weekdays_hours: string;
		saturday_hours: string;
		sunday_hours: string;
	}) {
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

		const weekdayMatch = location.weekdays_hours.match(
			/(\d{1,2}(?::\d{2})?\s*[ap]m)\s*-\s*(\d{1,2}(?::\d{2})?\s*[ap]m)/i
		);
		if (weekdayMatch) {
			const [, start, end] = weekdayMatch;
			const range = { start: to24(start), end: to24(end) };
			['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach((day) => {
				result[day] = range;
			});
		}

		const saturdayMatch = location.saturday_hours.match(
			/(\d{1,2}(?::\d{2})?\s*[ap]m)\s*-\s*(\d{1,2}(?::\d{2})?\s*[ap]m)/i
		);
		if (saturdayMatch) {
			const [, start, end] = saturdayMatch;
			result.Saturday = { start: to24(start), end: to24(end) };
		}

		if (location.sunday_hours.toLowerCase().includes('closed')) {
			result.Sunday = null;
		} else {
			const sundayMatch = location.sunday_hours.match(
				/(\d{1,2}(?::\d{2})?\s*[ap]m)\s*-\s*(\d{1,2}(?::\d{2})?\s*[ap]m)/i
			);
			if (sundayMatch) {
				const [, start, end] = sundayMatch;
				result.Sunday = { start: to24(start), end: to24(end) };
			}
		}

		return result;
	}

	const locationHours = expandHours(data.location[0]);
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
		<h1 class="text-center text-primary fw-bold mb-4">{data.location[0].name} Office</h1>
		<div class="row g-5">
			<div class="col-md-6">
				<div class="card shadow-sm h-100 border-0">
					<div class="card-body">
						<h4 class="fw-semibold">Contact Information</h4>
						<p>
							<i class="fa fa-phone text-primary me-2"></i>Phone:
							<a href={`tel:${data.location[0].phone}`}>{data.location[0].phone}</a><br />
							<i class="fa fa-envelope text-primary me-2"></i>Email:
							<a href={`mailto:${data.location[0].email}`}>{data.location[0].email}</a>
						</p>
						<hr />
						<h6 class="text-muted fw-semibold">Hours of Operation</h6>
						<p class="mb-1">{data.location[0].weekdays_hours}:</p>
						<p class="mb-1">{data.location[0].saturday_hours}</p>
						<p class="mb-1">{data.location[0].sunday_hours}</p>
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
								<input class="form-control" type="text" name="firstName" id="firstName" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="lastName"
									>Last Name <span class="text-danger">*</span></label
								>
								<input class="form-control" type="text" name="lastName" id="lastName" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="email"
									>Email <span class="text-danger">*</span></label
								>
								<input class="form-control" type="email" name="email" id="email" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="phone"
									>Phone <span class="text-danger">*</span></label
								>
								<input class="form-control" type="tel" name="phone" id="phone" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="dob"
									>Date of Birth <span class="text-danger">*</span></label
								>
								<input class="form-control" type="date" name="dob" id="dob" required />
							</div>
							<div class="mb-3">
								<label class="form-label" for="request-date"
									>Preferred Appointment Time<span class="text-danger">*</span></label
								>
								<input
									class="form-control"
									type="datetime-local"
									name="request-date"
									id="request-date"
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
												`Selected time must be between ${formatTo12Hour(constraint.start)} and ${formatTo12Hour(constraint.end)} on ${day}.`
											);
											e.currentTarget.value = '';
										}
									}}
								/>
							</div>
							<div class="mb-3">
								<label class="form-label" for="services"
									>Reason For Your Visit <span class="text-danger">*</span></label
								>
								<MultiselectInput services={data.services} bind:list={serviceArray}
								></MultiselectInput>
							</div>
							<div class="mb-3">
								<label for="notes">Notes For Doctor</label>
								<textarea class="form-control" name="notes" id="notes" style="height: 100px"></textarea>
							</div>
							<input type="hidden" name="locationId" value={data.location[0].id} />
							<input type="hidden" name="service" value={JSON.stringify(serviceArray)} />
							<button type="submit" class="btn btn-primary w-100">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
