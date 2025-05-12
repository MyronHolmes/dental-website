<script lang="ts">
	import type { Service } from "$lib/types.js";

	export let services: Service[];
	export let list: Record<string, string>[];

	function makeObj(key: string, value: string) {
		let obj: Record<string, string> = {};
		obj[key] = value;
		return obj;
	}

	function handelServiceClick(service: Service , e: Event) {
		const target = e.target as HTMLElement;
		let isChecked = false;

		if (target.tagName === 'DIV') {
			const checkbox = target.children.item(0) as HTMLInputElement;
			isChecked = checkbox.checked;
			checkbox.checked = !isChecked;
			trackOptions(service, !isChecked);
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
		(list);
	}
</script>

{#if services.length > 0}
	<div class="border border-light-subtle rounded w-auto" style="height: 70px; overflow-y: auto;">
		{#each services as service}
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
						on:click={(e) => trackOptions(service, (e.target as HTMLInputElement).checked)}
					/>
					<label class="ps-1" for={service.id}>{service.name}</label>
				</div>
			{/each}
	</div>
{:else if services.length < 1}
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
