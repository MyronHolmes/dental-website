<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';

	export let data;
</script>

<div class="d-flex flex-column min-vh-100">
	<NavBar locations={data.locations} />
	<main class="flex-fill">
		<slot />
	</main>
	<footer class="bg-secondary text-center text-white py-3">
		<i class="fa fa-copyright"></i>
		<strong> Copyright - Dental Bliss 2025</strong>
	</footer>
</div>
