<script lang="ts">
	import type { ServiceCategory, Service, ServiceObj } from './data/services.js';

	export let serviceCategories: ServiceCategory[];
	export let list: ServiceObj[];

	function makeObj(key: string, value: string): ServiceObj {
		let obj: ServiceObj = {};
		obj[key] = value;
		return obj;
	}

	function handelServiceClick(service: Service, e: Event) {
		const target = e.target as HTMLElement;
		let isChecked = false;

		if (target.tagName === "DIV"){
			const checkbox = target.children.item(0) as HTMLInputElement;
			isChecked = checkbox.checked;
			checkbox.checked = !isChecked;
			trackOptions(service, !isChecked)
		}
	}

	function trackOptions(service: Service, checked: boolean) {
		const key = service.id;
		const value = service.name;

		if (!checked) {
			list = list.filter((obj) => !obj[key]);
		} else {
			const newObj = makeObj(key, value);
			list = [...list, newObj];
		}
		console.log(list)
	}
</script>

<!-- Service List Dropdown -->
{#if serviceCategories.length > 0}
	<div class="border border-light-subtle rounded w-auto" style="height: 70px; overflow-y: auto;">
		{#each serviceCategories as category}
			{#each category.services as service: Service (service.id)}
				<div
					class="form-check text-dark"
					role="button"
					tabindex="0"
					aria-label="service-item"
					on:click={(e) => handelServiceClick(service, e)}
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							handelServiceClick(service, e);
						}
					}}
				>
					<input
						class="service-item"
						type="checkbox"
						checked={list.some((obj) => service.id in obj)}
						value={JSON.stringify(makeObj(service.id, service.name))}
						id={service.id}
						on:click={(e) => trackOptions(service,(e.target as HTMLInputElement).checked)}
					/>
					<label class="ps-1" for={service.id}>{service.name}</label>
				</div>
			{/each}
		{/each}
	</div>
{:else if serviceCategories.length < 1}
	<span class="text-danger">No Results Found</span>
{/if}

<style>
	.form-check:hover {
		background-color: #0d6efd;
	}
	.form-check:hover label {
		color: white;
	}
</style>
