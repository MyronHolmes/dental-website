<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="d-flex flex-column min-vh-100">
	<NavBar />

	<main class="flex-fill">
		<slot />
	</main>

	<footer class="bg-secondary text-center text-white py-3">
		<i class="fa fa-copyright"></i>
		<strong> Copyright - Dental Bliss </strong>
	</footer>
</div>
