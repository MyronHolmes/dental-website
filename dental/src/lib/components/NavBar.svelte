<script lang="ts">
	import { page } from '$app/state';
	import { locations } from './data/locations.js';

	function formattedTitle(pathname: string): string {
		const slug = pathname.split('/').filter(Boolean).pop() || '';
		return slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}
</script>

<svelte:head>
	<title
		>{page.url.pathname === '/' ? 'Home' : formattedTitle(page.url.pathname)} | Dental Bliss</title
	>
</svelte:head>
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
	<div class="container">
		<a class="navbar-brand fw-bold text-primary" href="/">Dental Bliss</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item">
					<a class="nav-link {page.url.pathname === '/' ? 'active' : ''}" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {page.url.pathname === '/about' ? 'active' : ''}" href="/about"
						>About</a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link {page.url.pathname === '/services' ? 'active' : ''}" href="/services"
						>Services</a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link {page.url.pathname === '/contact' ? 'active' : ''}" href="/contact"
						>Contact</a
					>
				</li>

				<li class="nav-item dropdown">
					<a
						class="nav-link dropdown-toggle {page.url.pathname.startsWith('/location')
							? 'active'
							: ''}"
						id="locationsDropdown"
						href="/"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Locations
					</a>
					<ul class="dropdown-menu" aria-labelledby="locationsDropdown">
						{#each locations as loc}
							<li>
								<a class="dropdown-item" href={loc.path}>{loc.name}</a>
							</li>
						{/each}
					</ul>
				</li>

				<li class="nav-item d-flex align-items-center gap-2 ms-3">
					<a
						aria-label="instagram icon"
						href="https://instagram.com"
						target="_blank"
						class="social-icon nav-link"
					>
						<i class="fa fa-instagram"></i>
					</a>
					<a
						aria-label="facebook icon"
						href="https://facebook.com"
						target="_blank"
						class="social-icon nav-link"
					>
						<i class="fa fa-facebook"></i>
					</a>
					<a
						aria-label="youtube icon"
						href="https://youtube.com"
						target="_blank"
						class="social-icon nav-link"
					>
						<i class="fa fa-youtube-play"></i>
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	.nav-link {
		color: #555;
		transition: color 0.3s ease;
	}
	.nav-link:hover {
		color: #0d6efd;
	}
	.nav-link.active {
		color: #0d6efd;
		font-weight: 600;
	}
	.nav-link:focus {
		outline: none;
		box-shadow: none;
	}
	.social-icon i {
		display: inline-block;
		min-width: 1.6rem;
		text-align: center;
		color: #555;
		font-size: 1.2rem;
		transition:
			color 0.3s ease,
			transform 0.3s ease;
	}
	.social-icon:hover i {
		color: #0d6efd;
		transform: scale(1.3);
	}
</style>
