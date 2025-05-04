<script lang="ts">
	export let type: 'polite' | 'assertive';
	export let time: string;
	export let message: string;
</script>

<div
	class="toast fade show z-3 position-absolute top-1 end-0 me-5"
	role="alert"
	aria-live={type}
	aria-atomic="true"
	data-bs-delay={time}
    class:bg-success={type === "polite"}
    class:bg-danger={type === "assertive"}
>
	<div class="toast-header">
		<strong class="me-auto">Dental Bliss</strong>
		<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
	</div>
	<div class="toast-body">
		{message}
	</div>
</div>
