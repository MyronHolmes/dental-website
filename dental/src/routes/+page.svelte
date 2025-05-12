<script lang="ts">
	import { base } from '$app/paths';
	import AOS from 'aos';
	import 'aos/dist/aos.css';
	import { onMount } from 'svelte';

	export let data;
	onMount(() => {
		AOS.init({ once: true });
	});
</script>

<div class="welcome-section text-center text-white d-flex align-items-center">
	<div class="container py-5">
		<h1 class="display-4 fw-bold text-primary">Welcome to Dental Bliss</h1>
		<p class="lead">Bright smiles. Brighter futures.</p>
		<a href="{base}/contact" class="btn btn-outline-primary mt-3">Contact Us</a>
	</div>
</div>
<section class="container my-5 px-3">
	<div class="row align-items-center">
		<div class="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
			<img
				src="{base}/team.jpg"
				alt="Smiling family at the dentist"
				class="img-fluid rounded shadow"
			/>
		</div>
		<div class="col-md-6" data-aos="fade-left">
			<h2 class="text-primary mb-3">Dental Care for All Ages</h2>
			<p class="lead">
				At Dental Bliss, we believe everyone deserves a confident smile — from toddlers to
				grandparents. Our compassionate team provides expert care in a friendly environment where
				patients feel right at home.
			</p>
			<p>
				With trusted experience and modern technology, we offer a wide range of dental services
				including cleanings, teeth whitening, and restorative treatments. Whether you're visiting
				for a routine check-up or a complete smile makeover, you're in good hands.
			</p>
			<div class="d-flex justify-content-center">
				<a href="{base}/services" class="btn btn-outline-primary mt-2">Explore Our Services</a>
			</div>
		</div>
	</div>
</section>
<section class="bg-light py-5">
	<div class="container text-center">
		<h2 class="text-primary mb-4">Our Services</h2>
		<p class="mb-5">
			From preventive care to cosmetic and restorative dentistry, we offer treatments tailored to
			every smile.
		</p>
		<div class="row g-4">
			<div class="col-md-4" data-aos="zoom-in">
				<div class="p-4 border rounded shadow-sm h-100">
					<h5>Routine Check-Ups</h5>
					<p>
						Keep your smile healthy with regular exams, cleanings, and x-rays for the whole family.
					</p>
				</div>
			</div>
			<div class="col-md-4" data-aos="zoom-in" data-aos-delay="100">
				<div class="p-4 border rounded shadow-sm h-100">
					<h5>Cosmetic Dentistry</h5>
					<p>
						From teeth whitening to veneers, we help you achieve a smile that shines with
						confidence.
					</p>
				</div>
			</div>
			<div class="col-md-4" data-aos="zoom-in" data-aos-delay="200">
				<div class="p-4 border rounded shadow-sm h-100">
					<h5>Restorative Care</h5>
					<p>
						We offer fillings, crowns, bridges, and implants to restore comfort and functionality.
					</p>
				</div>
			</div>
		</div>
		<a href="{base}/services" class="btn btn-outline-primary mt-4">View All Services</a>
	</div>
</section>
<section class="bg-white py-2">
	<div class="container text-center" data-aos="fade-down">
		<h4 class="text-primary mb-2">What Our Patients Say</h4>
		<div id="testimonialCarousel" class="carousel carousel-dark slide" data-bs-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active">
					<blockquote class="blockquote">
						<p class="mb-23">"The most caring and professional dental team I've ever met!"</p>
						<footer class="blockquote-footer">Sarah M.</footer>
					</blockquote>
				</div>
				<div class="carousel-item">
					<blockquote class="blockquote">
						<p class="mb-23">
							"They made my son feel comfortable and excited about going to the dentist."
						</p>
						<footer class="blockquote-footer">James R.</footer>
					</blockquote>
				</div>
				<div class="carousel-item">
					<blockquote class="blockquote">
						<p class="mb-23">
							"I enjoyed coming here as child. Now I bring my children and they love it as much as I
							did."
						</p>
						<footer class="blockquote-footer">Linn B.</footer>
					</blockquote>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#testimonialCarousel"
				data-bs-slide="prev"
				aria-label="Previous testimonial"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#testimonialCarousel"
				data-bs-slide="next"
				aria-label="Next testimonial"
			>
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
			</button>
		</div>
	</div>
</section>
<section class="bg-light py-5">
	<div class="container text-center">
		<h2 class="text-primary mb-3">Get in Touch</h2>
		<p class="mb-4">
			We're proud to serve several communities across the region — find a Dental Bliss near you.
		</p>
		<div class="row justify-content-center g-4">
			{#each data.locations as location}
				<div class="col-md-4" data-aos="fade-up">
					<div class="p-4 border rounded shadow-sm h-100">
						<h5>{location.name}</h5>
						<a class="btn btn-outline-primary btn-sm mt-2" href={`${base}${location.path}`}
							>View location</a
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.welcome-section {
		background-image:
			linear-gradient(rgba(211, 211, 211, 0.6), rgba(211, 211, 211, 0.6)), url('/man-smiling.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		min-height: 400px;
		padding-top: 60px;
	}
	.shadow-sm:hover {
		transform: translateY(-5px);
		transition: transform 0.2s ease-in-out;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
	}
</style>
