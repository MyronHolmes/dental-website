<script lang="ts">
	import type { ServiceCategory } from "./data/services.js";

    export let serviceCategories: ServiceCategory[];

    function makeObj(key: string, value: string) {
        const obj: Record<string, string> = {};
        obj[key] = value;
        return obj;
    }
</script>

		<!-- Service List Dropdown -->
		{#if serviceCategories.length > 0}
			<div class="border border-light-subtle rounded w-auto" style="height: 70px; overflow-y: auto;">
				{#each serviceCategories as category}
                {#each category.services as service (service.id)}
					<div
						class="form-check text-dark"
						role="button"
						tabindex="0"
						aria-label="service-item"
					>
						<input
							class="company-item"
							type="checkbox"
							id={service.id}
							name={service.id}
							value={JSON.stringify(makeObj(service.id, service.name))}
						/>
						<label class="ps-1" for={service.id}>{service.name}</label>
					</div>
				{/each}
                {/each}
			</div>
		{:else if serviceCategories.length < 1}
			<span class="text-danger">No Results Found</span>
		{/if}
